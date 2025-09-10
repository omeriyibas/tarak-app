import api from './api';

export type Option = { label: string; value: number };

export async function getDistrictOptions(cityId: number): Promise<Option[]> {
    const { data } = await api.get<Option[]>(`/district/options`, { params: { city_id: cityId } });
    return data ?? [];
}


