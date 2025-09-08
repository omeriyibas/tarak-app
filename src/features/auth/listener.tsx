// app/authListeners.ts
import { addPersist, clearPersist } from '@/src/features/auth/persist';
import { logout, setError, setStatus, setTokens } from "@/src/features/auth/slice";
import { loginThunk, refreshThunk, registerThunk } from '@/src/features/auth/thunks';
import { AuthState, PayloadToken } from '@/src/features/auth/types';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';


export const authListener = createListenerMiddleware();

// 1) login/refresh/register FULFILLED → setTokens + persist
authListener.startListening({
    matcher: isAnyOf(loginThunk.fulfilled, refreshThunk.fulfilled, registerThunk.fulfilled),
    effect: async (action, api) => {

        const { access_token, refresh_token } = action.payload as PayloadToken;

        // State’i güncelle
        api.dispatch(setTokens({ access_token: access_token, refresh_token: refresh_token }));
        api.dispatch(setStatus('authenticated'));
        api.dispatch(setError(null));

        // Persist’i BEKLEYEREK yap (reducer’da await yoktu)
        const state = api.getState() as { auth: AuthState };
        await addPersist(state.auth);
    },
});

// 2) Thunk REJECTED → status & error güncelle
authListener.startListening({
    matcher: isAnyOf(loginThunk.rejected, refreshThunk.rejected, registerThunk.rejected),
    effect: async (action, api) => {
        const msg =
            (action.payload as string)
            // ?? (action.error?.message ?? 'İşlem başarısız');
        api.dispatch(setStatus('error'));
        api.dispatch(setError(String(msg)));

        // Refresh başarısızsa tokenları sil
        if (action.type === refreshThunk.rejected.type) {
            api.dispatch(logout());
            await clearPersist();
        }
    },
});

// 3) logout → persist temizle
authListener.startListening({
    actionCreator: logout,
    effect: async () => {
        await clearPersist();
    },
});
