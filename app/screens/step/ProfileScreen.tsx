import useProgress from "@/src/hooks/useProgress";
import {FlowType} from "@/src/constants/progress";
import {Box} from "@/src/components/ui/box";
import Button1 from "@/src/components/common/Button1";
import React, {useState} from "react";
import {VStack} from "@gluestack-ui/themed";
import IconButton from "@/src/components/common/IconButton";
import {Plus} from "lucide-react-native";
import FormInput from "@/src/components/common/FormInput";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import Text1 from "@/src/components/common/Text1";
import UseImagePicker from "@/src/hooks/useImagePicker";
import {createStoreWithImage, createStoreWithoutImage} from "@/src/services/store-info";
import {Image} from "react-native";
import {useSelector} from "react-redux";
import {selectPhotoUri} from "@/src/features/photo/slice";
import {RootState} from "@/src/store/store";
import {Pressable} from "@/src/components/ui/pressable";
import PhotoSheet from "@/src/components/photo/PhotoSheet";

const schema = z.object({
    name: z.string().min(1, "Mağaza adı boş bırakılamaz"),
});

type FormValues = z.infer<typeof schema>;

const AdresScreen = () => {
    const {goNext} = useProgress({flow: FlowType.Details});
    const [isLoading, setIsLoading] = useState(false);
    const selectedImage = useSelector((state: RootState) => selectPhotoUri(state));
    const [photoSheetIsOpen, setPhotoSheetIsOpen] = useState(false)
    const {control, handleSubmit} = useForm<FormValues>({
        resolver: zodResolver(schema) as any,
        defaultValues: {name: ""},
    });

    const {pickImage} = UseImagePicker({});

    const handleImagePick = async () => {
        try {
            await pickImage();
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };

    const handleNext = async (data: FormValues) => {
        if (selectedImage) {
            await createStoreWithImage(data.name, selectedImage);
        } else {
            await createStoreWithoutImage({name: data.name});
        }

        await goNext()
    };


    return (
        <>
            <PhotoSheet isOpen={photoSheetIsOpen} setIsOpen={setPhotoSheetIsOpen}/>
            <Box className={"justify-between flex-1"}>
                <Box className={"gap-10"}>
                    <Box className={"items-center gap-3"}>
                        <Pressable
                            className={"bg-gray-200 h-40 w-40 rounded-xl justify-center items-center"}
                            onTouchEnd={handleImagePick}
                        >
                            {selectedImage ? (
                                <Image
                                    source={{uri: selectedImage}}
                                    className={"h-full w-full rounded-xl"}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Plus size={"40%"}/>
                            )}
                        </Pressable>
                        <Text1 text={"Mağaza Resmi"}/>
                    </Box>
                    <FormInput placeholder={"Mağaza Adı"} name={"name"} control={control}/>
                </Box>
                <Box className={"px-2"}>
                    <Button1
                        onPress={handleSubmit(handleNext)}
                        text={isLoading ? "Kaydediliyor..." : "Next"}
                    />
                </Box>
            </Box>
        </>
    );
};

export default AdresScreen;
