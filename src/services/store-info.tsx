import api from './api';
import { uploadImage } from './upload-image';
import { Platform } from 'react-native';
import {toApiError} from "@/src/services/errors";

export type StoreInfoCreate = {
    name: string;
};

export type StoreInfoResponse = {
    id: number;
    name: string;
    user_id: number;
    profile_image_url?: string;
};

export async function createStoreWithImage(name: string, imageUri: string): Promise<StoreInfoResponse> {
    const formData = new FormData();

    // Add the name as a form field
    formData.append('name', name);

    // Add the image file
    const fileName = imageUri.split('/').pop() || `store_${Date.now()}.jpg`;


    if (Platform.OS === 'web') {
        const blob = await (await fetch(imageUri)).blob();
        const webFile = new File([blob], fileName, { type: blob.type || 'image/jpeg' });
        formData.append('file', webFile);
    } else {
        formData.append('file', {
            uri: imageUri,
            name: fileName,
            type: 'image/jpeg'
        } as any);
    }

    console.log(formData)

    try {
        const { data } = await api.post('/store_info', formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data as StoreInfoResponse;
        // return res;
    } catch (e) {
        console.log(e)
        throw toApiError(e);
    }
}

export async function createStoreWithoutImage(storeData: StoreInfoCreate): Promise<StoreInfoResponse> {
    const { data } = await api.post('/store_info/without-image', storeData);
    return data;
}

export async function getAllStores(): Promise<StoreInfoResponse[]> {
    const { data } = await api.get('/store_info');
    return data;
}

export async function getStore(storeId: number): Promise<StoreInfoResponse> {
    const { data } = await api.get(`/store_info/${storeId}`);
    return data;
}

export async function updateStore(storeId: number, storeData: StoreInfoCreate): Promise<StoreInfoResponse> {
    const { data } = await api.put(`/store_info/${storeId}`, storeData);
    return data;
}

export async function deleteStore(storeId: number): Promise<void> {
    await api.delete(`/store_info/${storeId}`);
}
