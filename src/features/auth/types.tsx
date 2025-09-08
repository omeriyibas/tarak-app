export type JwtPayload = { sub: string; exp: number; email?: string; roles?: string[] };

export type UserLite = { id: string; email?: string; roles?: string[] } | null;

export type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    user: UserLite;
    status: 'idle' | 'loading' | 'authenticated' | 'error';
    error?: string | null;
};

export type LoginPayload = { phone_number: string; password: string };

export type PayloadToken = { access_token: string; refresh_token?: string };

