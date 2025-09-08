import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer, {hydrateFromStorage, logout, setTokens} from '../features/auth/slice';
import progressReducer from '../features/progress/slice';
import {setAuthCallbacks} from "@/src/services/api";
import {storage} from "@/src/lib/storageAdapter";
import {ACCESS_KEY, REFRESH_KEY} from "@/src/constants/auth";
import {authListener} from "@/src/features/auth/listener";
import {progressListener} from "@/src/features/progress/listener";


const rootReducer = combineReducers({
    progress: progressReducer,
    auth: authReducer,
    // user: userReducer,
});
const store = configureStore({
    reducer: rootReducer,
    // middleware: (gDM) => gDM().concat(authListener.middleware, progressListener.middleware),
    middleware: (gDM) => gDM().prepend(authListener.middleware,progressListener.middleware),
    // middleware: (gDM) => gDM().prepend(authListener.middleware),
});

setAuthCallbacks({
    getToken: () => store.getState().auth.accessToken,
    getRefreshToken: () => store.getState().auth.refreshToken,
    setTokens: ({access, refresh}) => {
        store.dispatch(setTokens({access_token: access, refresh_token: refresh}));
    },
    logout: () => store.dispatch(logout()),
});

(async () => {

    // const storage = await getStorage();

    const [a, r] = await Promise.all([
        storage.getItem(ACCESS_KEY),
        storage.getItem(REFRESH_KEY),
    ]);
    store.dispatch(hydrateFromStorage({access: a, refresh: r}));

})();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
