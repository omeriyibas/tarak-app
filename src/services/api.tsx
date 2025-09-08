import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import data from '../../config.json';

export const apiUrl: string = data.apiUrl;

// Callback'ler - store'dan bağımsız
let getTokenCallback: (() => string | null) | null = null;
let getRefreshTokenCallback: (() => string | null) | null = null;
let setTokensCallback: ((tokens: { access: string; refresh?: string }) => void) | null = null;
let logoutCallback: (() => void) | null = null;

export const setAuthCallbacks = (callbacks: {
    getToken: () => string | null;
    getRefreshToken: () => string | null;
    setTokens: (tokens: { access: string; refresh?: string }) => void;
    logout: () => void;
}) => {
    getTokenCallback = callbacks.getToken;
    getRefreshTokenCallback = callbacks.getRefreshToken;
    setTokensCallback = callbacks.setTokens;
    logoutCallback = callbacks.logout;
};

type WithRetry = AxiosRequestConfig & { _retry?: boolean };

const api = axios.create({
    baseURL: apiUrl,
    // timeout: 20000,
    // withCredentials: true,
});

// İstek interceptor: Access token'ı header'a koy
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getTokenCallback?.();
    if (token) {
        config.headers = config.headers ?? {};
        // refresh endpointini bu axios örneğiyle çağırmıyoruz ama
        // olası yanlış kullanımda access header'ı basmak istemeyebilirsin:
        // if (!config.url?.includes('/auth/refresh')) ...
        (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
});

let isRefreshing = false;

interface RefreshQueueItem {
    resolve: (token: string | null) => void;
    reject: (err: unknown) => void;
    original: WithRetry;
}
let queue: RefreshQueueItem[] = [];

const flushQueue = (err: unknown, token: string | null = null) => {
    queue.forEach(p => (err ? p.reject(err) : p.resolve(token)));
    queue = [];
};

type RefreshResponse = {
    access_token: string;
    refresh_token?: string;
};

// Basit hata normalizer
const toApiError = (error: unknown) => {
    const ax = error as AxiosError<any>;
    const status = ax.response?.status;
    const message =
        ax.response?.data?.detail ||
        ax.response?.data?.message ||
        ax.message ||
        'Network or unknown error';
    return { status, message, raw: error };
};

api.interceptors.response.use(
    r => r,
    async (error: AxiosError) => {
        const original = (error.config || {}) as WithRetry;

        // AĞ/ÇEVRİM-DIŞI hataları
        if (!error.response && error.request) {
            // İstersen burada tekrar deneme/backoff stratejisi koyabilirsin
            return Promise.reject(toApiError(error));
        }

        const status = error.response?.status;

        // 401 (veya opsiyonel 419) geldi ve daha önce retry yapılmadıysa
        if ((status === 401 || status === 419) && !original._retry) {
            // refresh isteğinin kendisi 401 verdiyse döngüye girmeyelim
            if (original.url?.includes('/auth/refresh')) {
                logoutCallback?.();
                return Promise.reject(toApiError(error));
            }

            original._retry = true;

            // Halihazırda refresh sürüyorsa kuyruğa ekle
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    queue.push({
                        resolve: (token: string | null) => {
                            if (token) {
                                original.headers = original.headers ?? {};
                                (original.headers as any).Authorization = `Bearer ${token}`;
                            }
                            resolve(api(original));
                        },
                        reject,
                        original,
                    });
                });
            }

            isRefreshing = true;
            try {
                const rt = getRefreshTokenCallback?.();
                if (!rt) {
                    throw new Error('No refresh token');
                }

                // DİKKAT: refresh'i global axios ile çağırıyoruz ki api interceptor’larına takılmasın
                const { data } = await axios.post<RefreshResponse>(`${apiUrl}/auth/refresh`, {
                    refresh_token: rt,
                });

                const newAccess = data?.access_token;
                if (!newAccess) {
                    throw new Error('Token refresh failed');
                }

                // Tokenları store'a yaz
                setTokensCallback?.({ access: newAccess, refresh: data?.refresh_token });

                // Kuyruktakileri çöz
                flushQueue(null, newAccess);

                // Orijinali tekrar at
                original.headers = original.headers ?? {};
                (original.headers as any).Authorization = `Bearer ${newAccess}`;
                return api(original);
            } catch (e) {
                // Refresh başarısız — kuyruğu reddet ve logout
                flushQueue(e, null);
                logoutCallback?.();
                return Promise.reject(toApiError(e));
            } finally {
                isRefreshing = false;
            }
        }

        // Diğer durumlar — normalleştir
        return Promise.reject(toApiError(error));
    }
);

export default api;
