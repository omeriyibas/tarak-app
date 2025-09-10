// app/services/upload.ts
import api from "@/src/services/api";
import {toApiError} from "@/src/services/errors";
import {uploadImage} from "@/src/services/upload-image";

export interface PhotoResponse {
    id: number;
    user_id: number;
    url_path: string;
    created_at: string;
}

export interface PhotoListResponse {
    photos: PhotoResponse[];
    total: number;
}

export async function addUserPhoto(uri: string) {
    return await uploadImage(uri, "/image/photo");
}

export async function getUserPhotos(skip: number = 0, limit: number = 100): Promise<PhotoListResponse> {
    try {
        const res = await api.get("/image/photos", {
            params: { skip, limit }
        });
        return res.data as PhotoListResponse;
    } catch (e) {
        throw toApiError(e);
    }
}

export async function getPhoto(photoId: number): Promise<PhotoResponse> {
    try {
        const res = await api.get(`/image/photo/${photoId}`);
        return res.data as PhotoResponse;
    } catch (e) {
        throw toApiError(e);
    }
}

export async function deletePhoto(photoId: number): Promise<void> {
    try {
        await api.delete(`/image/photo/${photoId}`);
    } catch (e) {
        throw toApiError(e);
    }
}
