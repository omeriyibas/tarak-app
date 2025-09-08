import {RootState} from "@/src/store/store";

export const selectIsAuthenticated = (s: RootState) => Boolean(s.auth.status==='authenticated');
export const selectIsLoggedOut = (s: RootState) => Boolean(s.auth.status==='idle');


// export const selectIsAuthenticated = (s: RootState) => s.auth.status;
// export const selectIsAuthenticated = (s: RootState) => Boolean(s.authReducer.accessToken);
export const selectUser = (s: RootState) => s.auth.user;
export const selectAuthStatus = (s: RootState) => s.auth.status;

export const selectAuthError = (s: RootState) => s.auth.error;
