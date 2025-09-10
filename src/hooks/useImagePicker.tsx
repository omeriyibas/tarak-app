import {useState} from "react";
import * as ImagePicker from "expo-image-picker";
import {addUserPhoto} from "@/src/services/photo";
import {useDispatch} from "react-redux";
import {setPhotoUri} from "@/src/features/photo/slice";

type Props = {
    closeSheet?: () => void;
    refresh?: () => void;
}

const UseImagePicker = ({closeSheet, refresh}: Props) => {
    const [image, setImage] = useState<string | null>(null);

    const dispatch = useDispatch();

    const pickImage = async () => {
        // Galeri erişim izni iste
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("Galeriye erişim izni vermelisin!");
            return;
        }

        // Galeriden seçim yap
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true, // Kırpma
            // aspect: [4, 3], // Kırpma oranı
            // quality: 1, // 0–1 arası kalite
        });

        if (!result.canceled) {
            if (closeSheet) closeSheet()
            dispatch(setPhotoUri(result.assets[0].uri)); // null göndermek temizler
            // const res = await addUserPhoto(result.assets[0].uri);
            // const res = await addUserPhoto(result.assets[0].uri);
            // console.log(res.status)
            // if (res.status === 201) {
            //
            //     if (closeSheet) await refresh();
            // }

            // setImage(result.assets[0].uri);
        }
    };

    return {image, pickImage};
};

export default UseImagePicker;
