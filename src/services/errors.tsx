// errors.ts
import { AxiosError } from "axios";

export type FieldErrors = Record<string, string>;

export class ApiError extends Error {
    status?: number;
    code?: string;
    requestId?: string;
    data?: any;
    fields?: FieldErrors;

    constructor(msg: string, opts: Partial<ApiError> = {}) {
        super(msg);
        this.name = "ApiError";
        Object.assign(this, opts);
    }
}

/**
 * Sunucudan gelen hatayı kullanıcıya gösterilebilir tek tipe çevirir.
 * FastAPI 422/HTTPException, DRF, generic {message}, {detail}, {errors[]} gibi şekilleri ele alır.
 */
export function toApiError(err: unknown): ApiError {
    // Axios ise detay al
    if ((err as AxiosError)?.isAxiosError) {
        const ax = err as AxiosError;
        const status = ax.response?.status;
        const data = ax.response?.data as any;
        const reqId =
            (ax.response?.headers as any)?.["x-req-id"] ||
            (ax.config?.headers as any)?.["X-Req-Id"];

        // 1) Field (alan) hataları – FastAPI 422 formatı
        // data = { detail: [ { loc: ["body","field"], msg: "..." }, ... ] }
        if (status === 422 && Array.isArray(data?.detail)) {
            const fields: FieldErrors = {};
            for (const item of data.detail) {
                const path = Array.isArray(item.loc) ? item.loc.slice(1).join(".") : undefined;
                if (path) fields[path] = item.msg || "Geçersiz değer";
            }
            return new ApiError("Formu kontrol edin.", {
                status,
                data,
                fields,
                requestId: reqId,
            });
        }

        // 2) Yaygın mesaj alanları
        const msg =
            data?.message ||
            data?.detail ||
            data?.error ||
            data?.errors?.[0]?.message ||
            ax.message ||
            "Beklenmeyen bir hata oluştu.";

        // 3) Uygulama hatası kodu (varsa)
        const code =
            data?.code ||
            data?.error_code ||
            data?.error?.code ||
            (status === 401 ? "UNAUTHORIZED" : undefined);

        return new ApiError(msg, {
            status,
            code,
            data,
            requestId: reqId,
        });
    }

    // Axios dışı (throw new Error vs.)
    const any = err as any;
    return new ApiError(any?.message || "Beklenmeyen bir hata.", { data: any });
}
