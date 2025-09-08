import {fetchProgress, saveProgress} from "@/src/services/progress";
import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "@/src/services/api";
import {toApiError} from "@/src/services/errors";

export const loadProgressThunk = createAsyncThunk(
    "progress/load",
    async (flow: string) => {
        try {
            const {data} = await api.get(`/progress/${flow}`);
            return {flow: flow, step: data.step};
        } catch (e) {
            const {message, data} = toApiError(e)
            return rejectWithValue(message);
        }
    }
);

export const updateProgressThunk = createAsyncThunk(
    "progress/update",
    async ({flow, step}: { flow: string; step: number }) => {
        try {
            const {data} = await api.put(`/progress/${flow}`, {step: step});
            return {flow: flow, step: step};
        } catch (e) {
            const {message, data} = toApiError(e)
            return rejectWithValue(message);
        }

    }
);
