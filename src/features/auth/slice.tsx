import { clearPersist } from "@/src/features/auth/persist";
import { AuthState, JwtPayload, PayloadToken } from "@/src/features/auth/types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";


const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    user: null,
    status: 'idle',
    error: null,
};

const decodeUser = (accessToken: string) => {
    try {
        // Token format validation
        if (!accessToken || typeof accessToken !== 'string') {
            return null;
        }

        // JWT format kontrolü (3 parça olmalı: header.payload.signature)
        const parts = accessToken.split('.');
        if (parts.length !== 3) {
            return null;
        }

        const p = jwtDecode<JwtPayload>(accessToken);

        // Required fields kontrolü
        if (!p.sub || !p.exp) {
            return null;
        }

        // Expiration kontrolü
        const now = Math.floor(Date.now() / 1000);
        if (p.exp <= now) {
            return null;
        }

        return {id: p.sub, email: p.email, roles: p.roles};
    } catch {
        return null;
    }
};


const slice = createSlice({
    name: 'auth',
    // initialState: {...initialState, ...loadPersist()},
    initialState: initialState,
    reducers: {
        setStatus(state, action: PayloadAction<AuthState['status']>) { state.status = action.payload; },
        setError(state, action: PayloadAction<string | null>) { state.error = action.payload; },
        logout(state: AuthState) {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
        setTokens(state, action: PayloadAction<PayloadToken>) {
            const { access_token, refresh_token } = action.payload;
            state.accessToken = access_token;
            if (refresh_token !== undefined && refresh_token !== null && refresh_token !== '') {
                state.refreshToken = refresh_token;
            }
            const du = decodeUser(access_token);
            state.user = du ? { id: du.id, email: du.email, roles: du.roles } : null;
        },
        hydrateFromStorage(state, action: PayloadAction<{ access: string | null; refresh: string | null }>) {
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
            if (action.payload.access) {
                const du = decodeUser(action.payload.access);
                state.user = du ? { id: du.id, email: du.email, roles: du.roles } : null;
            } else {
                state.user = null;
            }
        },
    },
    // extraReducers: (builder: any) => {
    //     builder
    //         .addCase(loginThunk.pending, (state: AuthState) => {
    //             state.status = 'loading';
    //             state.error = null;
    //         })
    //         .addCase(loginThunk.fulfilled, (state: AuthState, {payload}: any) => {
    //             console.log(payload,"login payload")
    //             state.status = 'authenticated';
    //             state.accessToken = payload.access_token;
    //             state.refreshToken = payload.refresh_token;
    //             const du = decodeUser(payload.access_token);
    //             state.user = du ? {id: du.id, email: du.email, roles: du.roles} : null;
    //             // void addPersist(state);
    //         })
    //         .addCase(loginThunk.rejected, (state: AuthState, {payload}: any) => {
    //             state.status = 'error';
    //             state.error = payload;
    //         })
    //         .addCase(refreshThunk.fulfilled, (state: AuthState, {payload}: any) => {
    //             state.status = 'authenticated';
    //             state.accessToken = payload.access_token;
    //             state.refreshToken = payload.refresh_token;
    //             // if (payload.refresh_token) state.refreshToken = payload.refresh_token;
    //             const du = decodeUser(payload.access_token);
    //             state.user = du ? {id: du.id, email: du.email, roles: du.roles} : null;
    //             // void addPersist(state);
    //         })
    //         .addCase(refreshThunk.rejected, (state: AuthState, {payload}: any) => {
    //             state.accessToken = null;
    //             state.refreshToken = null;
    //             state.user = null;
    //             state.status = 'error';
    //             state.error = payload;
    //             // void clearPersist();
    //         })
    //         .addCase(registerThunk.pending, (state: AuthState) => {
    //             state.status = 'loading';
    //             state.error = null;
    //         })
    //         .addCase(registerThunk.fulfilled, (state: AuthState, {payload}: any) => {
    //             // Eğer backend access+refresh token döndürüyorsa login gibi davran:
    //             if (payload.access_token) {
    //                 state.status = 'authenticated';
    //                 state.accessToken = payload.access_token;
    //                 state.refreshToken = payload.refresh_token;
    //                 state.user = decodeUser(payload.access_token);
    //                 void addPersist(state);
    //             } else {
    //                 // Sadece success döndüyse login ekranına yönlendireceksin.
    //                 state.status = 'idle';
    //             }
    //         })
    //         .addCase(registerThunk.rejected, (state: AuthState, {payload}: any) => {
    //             state.status = 'error';
    //             state.error = payload;
    //         });
    //
    // },
});

export const {setStatus,setError,logout, setTokens,hydrateFromStorage} = slice.actions;
export default slice.reducer;
