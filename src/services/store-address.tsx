import api from './api';

export type StoreAddressCreate = {
    city_id: number;
    district_id: number;
    detail: string;
};

export async function createStoreAddress(payload: StoreAddressCreate) {
    const { data } = await api.post(`/store-address`, payload);
    return data;
}


