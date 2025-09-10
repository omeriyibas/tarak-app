import api from "@/src/services/api";
import { toApiError } from "./errors";

export type DaysTuple = [boolean, boolean, boolean, boolean, boolean, boolean, boolean];

export type ProgressDays = {
    days: DaysTuple;
};

export const getDays = async (): Promise<ProgressDays> => {
    try {
        const { data } = await api.get("/progress/days");
        return data as ProgressDays;
    } catch (e) {
        throw toApiError(e);
    }
};

export const updateDays = async (days: DaysTuple): Promise<ProgressDays> => {
    try {
        const { data } = await api.put("/progress/days", { days });
        return data as ProgressDays;
    } catch (e) {
        throw toApiError(e);
    }
};


