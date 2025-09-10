import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent, ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper
} from "@/src/components/ui/actionsheet";
import {VStack} from "@/src/components/ui/vstack";
import ButtonIcon1 from "@/src/components/common/ButtonIcon1";
import ButtonIcon2 from "@/src/components/common/ButtonIcon2";
import CameraIcon from "@/assets/svg/camera";
import GalleryIcon from "@/assets/svg/gallery";
import {useCameraPermissions} from "expo-camera";
import {useEffect} from "react";
import {router, useRouter} from "expo-router";
import useImagePicker from "@/src/hooks/useImagePicker";


type Props = {
    screenName?: string;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    refresh?:()=>void;
}

const PhotoSheet = ({refresh,setIsOpen, isOpen, screenName}: Props) => {

    const {pickImage, image} = useImagePicker({closeSheet: ()=> setIsOpen(false),refresh:refresh})

    const openCamera = () => {
        // router.push(`/screens/photo/CameraScreen?fromScreen=${screenName}`);
        router.push(`/screens/photo/CameraScreen?fromScreen`);
    }


    return (

        <Actionsheet isOpen={isOpen}>
            <ActionsheetBackdrop onPress={() => setIsOpen(false)}/>
            <ActionsheetContent>
                <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator/>
                </ActionsheetDragIndicatorWrapper>
                <VStack className={"w-full p-8 gap-3"}>
                    <ButtonIcon1 onPress={openCamera} text={"Fotoğraf Çek"} icon={CameraIcon}/>
                    <ButtonIcon2 onPress={pickImage} text={"Galeriden Seç"} icon={GalleryIcon}/>
                </VStack>
            </ActionsheetContent>

        </Actionsheet>
    );
};

export default PhotoSheet;
