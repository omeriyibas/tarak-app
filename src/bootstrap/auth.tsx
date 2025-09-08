import { logout } from "@/src/features/auth/slice";
import { refreshThunk } from "@/src/features/auth/thunks";
import store from "@/src/store/store";
import { jwtDecode } from "jwt-decode";

type Payload = { exp: number };

const SAFE_MARGIN_SEC = 120; // 2 dk kala yenile

export async function bootstrapAuth() {
    const state: any = store.getState();
    const at: string | null = state.auth?.accessToken;
    const rt: string | null = state.auth?.refreshToken;

    console.log(state,"state")


    // Token yoksa sessiz çık
    if (!at) return;



    // access token parse edilemiyorsa temiz çık
    let exp = 0;
    try {
        const p = jwtDecode<Payload>(at);
        exp = p?.exp ?? 0;
    } catch {
        store.dispatch(logout());
        return;
    }

    const now = Math.floor(Date.now() / 1000);
    const left = exp - now;



    if (left <= 0 && rt) {
        // Süre geçmiş -> refresh dene
        const res: any = await store.dispatch<any>(refreshThunk());
        // if (!res?.payload?.access_token) {
        //     store.dispatch(logout());
        // }
        // else {
        //     store.dispatch(setTokens({ access: res.payload.access_token, refresh: res.payload.refresh_token }));
        // }
        return;
    }

    if (left > 0 && left < SAFE_MARGIN_SEC && rt) {
        // Az kalmış -> erken yenile (kullanıcı düşmesin)
        const res: any = await store.dispatch<any>(refreshThunk());
        // if (res?.payload?.access_token) {
        //     store.dispatch(setTokens({ access: res.payload.access_token, refresh: res.payload.refresh_token }));
        // } else {
        //     // refresh başarısızsa mevcut token süresi bitene kadar idare edebilir;
        //     // istersen burada logout da diyebilirsin
        // }
    }
}
