import api from "@/src/services/api";

export const fetchProgress = (flow: string) =>
    api.get(`/progress/${flow}`);

export const saveProgress = (flow: string, step: number) =>
    api.put(`/progress/${flow}`, { step:step });
