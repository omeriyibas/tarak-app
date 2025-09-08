// auth.service.ts
import { toApiError } from "./errors";
import api from "@/src/services/api";

export const login = async (email: string, password: string) => {
    try {
        const { data } = await api.post("/auth/login", { email, password });
        return data as { access_token: string; refresh_token?: string };
    } catch (e) {
        throw toApiError(e);
    }
};

export const register = async (payload: any) => {
    try {
        const { data } = await api.post("/auth/register", payload);
        return data;
    } catch (e) {
        const {message,data}=toApiError(e)
        console.log(message,data)
        throw toApiError(e);
    }
};

export const refresh = async (rt) => {
    try {
        const { data } = await api.post('/auth/refresh', { refresh_token: rt });
        return data as { id: number; email: string; roles: string[] };
    } catch (e) {
        throw toApiError(e);
    }
};
