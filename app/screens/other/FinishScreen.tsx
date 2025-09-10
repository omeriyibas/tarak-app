import {VStack} from "@/src/components/ui/vstack";
import {Box} from "@/src/components/ui/box";
import RangeSlider1Hour from "@/src/components/common/RangeSlider1Hour";
import Button1 from "@/src/components/common/Button1";
import React from "react";
import {createRangeHour} from "@/src/services/range-hour";
import useProgress from "@/src/hooks/useProgress";
import {FlowType} from "@/src/constants/progress";
import {Image} from "expo-image";
import Head1 from "@/src/components/common/Head1";
import Text1 from "@/src/components/common/Text1";
import {useRouter} from "expo-router";

const FinishScreen = () => {
    const router=useRouter();
    const {goNext} = useProgress({flow: FlowType.Details});

    const handleNext = async () => {
        router.replace("/screens/tab/MainScreen")
    }


    return (
        <VStack className={"h-full pb-24 pt-12 px-8 gap-20"}>
            <VStack className={"justify-between flex-1 pt-20"}>
                <VStack className={"gap-14"}>
                    <Head1 text={"Hesabınız Oluşturuldu"} size={"xl"}/>
                    <Text1 text={"Değerli İşletmenize hayırlı ve bol kazançlı günler dileriz. İşlerinizde bereket ve başarılarınızın devamını temenni ederiz."} size={"lg"}/>
                    <Box className={"items-center"}>
                        <Box className={"h-52 w-52 items-center"}>
                            <Image
                                source={require("@/assets/images/img.png")}
                                style={{width: "100%", height: "100%", borderRadius: 5}}
                                transition={200}
                                contentFit="fill"
                            />
                        </Box>
                    </Box>
                </VStack>
                <Box className={"px-2"}>
                    <Button1 onPress={handleNext} text={"Next"}/>
                </Box>
            </VStack>
        </VStack>
    );
};

export default FinishScreen;
