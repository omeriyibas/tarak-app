import {VStack} from "@/src/components/ui/vstack";
import {Box} from "@/src/components/ui/box";
import Button1 from "@/src/components/common/Button1";
import React, {useEffect, useState} from "react";
import Head1 from "@/src/components/common/Head1";
import {HStack} from "@/src/components/ui/hstack";
import IconButton from "@/src/components/common/IconButton";
import {Plus} from "lucide-react-native";
import PhotoSheet from "@/src/components/photo/PhotoSheet";
import {addUserPhoto, getUserPhotos, PhotoListResponse, PhotoResponse} from "@/src/services/photo";
import {Image} from 'expo-image';
import {Grid, GridItem} from "@/src/components/ui/grid";
import {FlatList, Pressable} from "react-native";
import PhotoList from "@/src/components/photo/PhotoList";
import ImageModal from "@/src/components/image/ImageModal";
import useProgress from "@/src/hooks/useProgress";
import {FlowType} from "@/src/constants/progress";
import {useSelector} from "react-redux";
import {selectPhotoUri} from "@/src/features/photo/slice";


const PhotoScreen = () => {
    const {goNext} = useProgress({flow: FlowType.Details});


    const [sheetIsOpen, setSheetIsOpen] = useState(false)
    const [photos, setPhotos] = useState<PhotoResponse[]>([])
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const photoUri = useSelector(selectPhotoUri)

    const handleNext = async () => {
        await goNext()
    }

    const refresh = async () => {
        const res = await getUserPhotos();
        setPhotos(res.photos);
    };

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        const uploadPhoto = async () => {
            if (photoUri) {
                // addUserPhoto fonksiyonunu import etmeyi unutmayın
                const res = await addUserPhoto(photoUri);
                if (res.status === 201) {
                    refresh();
                }
            }
        };
        uploadPhoto();
    }, [photoUri]);

    return (
        <>
            <ImageModal imgeUrl={selectedPhoto?.url_path} isOpen={!!selectedPhoto} setIsOpen={setSelectedPhoto}/>
            <PhotoSheet refresh={refresh} setIsOpen={setSheetIsOpen} isOpen={sheetIsOpen} screenName={"PhotoScreen"}/>
            <VStack className={"justify-between flex-1"}>
                <VStack className={"gap-12"}>
                    <HStack className={" justify-between items-center"}>
                        <Head1 size={"md"} text={"Fotoğraflar"}/>
                        <IconButton onPress={() => setSheetIsOpen(true)} icon={Plus} size={"md"}/>
                    </HStack>
                    <Box style={{maxHeight: "80%"}} className={"items-center"}>
                        <PhotoList photos={photos} onSelect={setSelectedPhoto} />
                    </Box>
                </VStack>

                <Box className={"px-2"}>
                    <Button1 onPress={handleNext} text={"Next"}/>
                </Box>
            </VStack>
        </>
    );
};

export default PhotoScreen;
