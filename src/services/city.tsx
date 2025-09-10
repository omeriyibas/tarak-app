import api from './api';

export type City = { id: number; name: string; code: number };
export type Option = { label: string; value: number };

export async function getAllCities(): Promise<City[]> {
    const { data } = await api.get<{ cities: City[]; total: number }>(`/city/all`);
    return data?.cities ?? [];
}

export async function getCityOptions(): Promise<Option[]> {
    const { data } = await api.get<Option[]>(`/city/options`);
    return data ?? [];
}


