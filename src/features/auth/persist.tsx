
import * as SecureStore from 'expo-secure-store';
import {AuthState} from "@/src/features/auth/types";
import {ACCESS_KEY, REFRESH_KEY} from "@/src/constants/auth";
import {storage} from "@/src/lib/storageAdapter";



// export const loadPersist = () => {
//     try {
//         // console.log(JSON.parse(SecureStore.getItem(KEY) as string),"SecureStore")
//         return JSON.parse(SecureStore.getItem(KEY) as string);
//     } catch (e) {
//         console.log(e)
//         return {};
//     }
// };

// export const persist = (state: AuthState) => {
//
//     // console.log(state)
//     // SecureStore.setItem(KEY, JSON.stringify({
//     //     accessToken: state.accessToken,
//     //     refreshToken: state.refreshToken,
//     //     user: state.user,
//     //     status: "authenticated",
//     // }));
//
//     // console.log(JSON.stringify(state))
//
//     SecureStore.setItem(KEY, JSON.stringify(state));
// };

export const addPersist = async (s: AuthState) => {
    // const storage = await getStorage();
    if (s.accessToken) await storage.setItem(ACCESS_KEY, s.accessToken);
    if (s.refreshToken) await storage.setItem(REFRESH_KEY, s.refreshToken);

};

export const clearPersist = async () => {
    // const storage = await getStorage();


    await storage.removeItem(ACCESS_KEY);
    await storage.removeItem(REFRESH_KEY);

    console.log("remove storage")
};
