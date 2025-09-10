import {useEffect, useRef, useState} from "react";
import {CameraView, useCameraPermissions} from "expo-camera";
import {TouchableOpacity, View} from "react-native";
import {VStack} from "@/src/components/ui/vstack";
import {useLocalSearchParams, useRouter} from "expo-router";
import {addUserPhoto} from "@/src/services/photo";
import {useDispatch} from "react-redux";
import {setPhotoUri} from "@/src/features/photo/slice";

const CameraScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const router=useRouter();

    // const [photoUri, setPhotoUri] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);

    // const { fromScreen } = useLocalSearchParams<{ fromScreen: string}>();
    const dispatch = useDispatch();



    useEffect(() => {
        // console.log(permission)
        if (permission !== null) {
            if (!permission?.granted) {
                requestPermission()
            }
        }
    }, [permission])

    const takePhoto = async () => {
        const photo = await cameraRef.current?.takePictureAsync();

        dispatch(setPhotoUri(photo.uri));
        router.back();

        // switch (fromScreen) {
        //     case "PhotoScreen":
        //         const res = await addUserPhoto(photo.uri);
        //         if (res.status === 201) {
        //             router.back();
        //         }
        //         break
        // }



    };


    return (
        <VStack style={{flex: 1}} className={"pt-24"}>
            <CameraView
                style={{flex: .7}}
                // className={"h-80"}
                ref={cameraRef}
                facing="back"
            />
            <View style={{flex: .2}} className={"justify-center items-center"}>
                <TouchableOpacity className={"h-24 w-24 bg-primary-500 rounded-full"}
                                  onPress={takePhoto}/>
            </View>
        </VStack>
    );
};

export default CameraScreen;
