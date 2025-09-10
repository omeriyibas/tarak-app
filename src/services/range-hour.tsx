import api from "@/src/services/api";

export type RangeHour = {
    id: number;
    start_hour: number;
    end_hour: number;
    user_id: number;
};

export type RangeHourCreate = {
    start_hour: number;
    end_hour: number;
};

export type RangeHourUpdate = Partial<RangeHourCreate>;

export const listRangeHours = () => api.get<RangeHour[]>(`/range-hour`);

export const createRangeHour = (payload: RangeHourCreate) =>
    api.post<RangeHour>(`/range-hour`, payload);

export const updateRangeHour = (id: number, payload: RangeHourUpdate) =>
    api.put<RangeHour>(`/range-hour/${id}`, payload);

export const deleteRangeHour = (id: number) => api.delete<void>(`/range-hour/${id}`);


