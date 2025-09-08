import { LoginPayload, PayloadToken } from "@/src/features/auth/types";
import api from "@/src/services/api";
import { toApiError } from "@/src/services/errors";
import { createAsyncThunk } from '@reduxjs/toolkit';


export const registerThunk = createAsyncThunk(
    'auth/register',
    async (payload: any) => {
        try {
            const {data} = await api.post('/auth/register', payload);
            return data;
        }
        catch (e) {
            throw toApiError(e);

        }
    }
);



export const loginThunk = createAsyncThunk<PayloadToken, LoginPayload>(
    'auth/login',
    async (payload:any,{ getState, rejectWithValue }) => {
        try {
            const { data } = await api.post('/auth/login', payload);
            return data as PayloadToken;
        }catch (e) {
            const {message,data}=toApiError(e)
            return rejectWithValue(message);
        }
    }
);

export const refreshThunk = createAsyncThunk<PayloadToken, void, { state: any }>(
    'auth/refresh',
    async (_, { getState, rejectWithValue }) => {
        const rt = getState().auth?.refreshToken;
        if (!rt) return rejectWithValue('No refresh token');
        try {
            const { data } = await api.post('/auth/refresh', { refresh_token: rt });
            return data as PayloadToken;
        }catch (e) {
            throw toApiError(e);
        }

    }
);
