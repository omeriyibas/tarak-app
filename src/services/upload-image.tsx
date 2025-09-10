// app/services/upload.ts
import {Platform} from "react-native";
import api from "@/src/services/api";
import {toApiError} from "@/src/services/errors";



export async function uploadImage(uri: string,url:string) {
    const fileName = uri.split("/").pop() || `photo_${Date.now()}.jpg`;
    const form = new FormData();

    if (Platform.OS === "web") {
        const blob = await (await fetch(uri)).blob();
        form.append("file", blob, fileName);
    } else {
        form.append("file", {uri, name: fileName, type: "image/jpeg"} as any);
    }

    try {
        const res = await api.post(url, form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        // return res.data as PhotoResponse;
        return res;
    } catch (e) {
        console.log(e)
        throw toApiError(e);
    }
}
