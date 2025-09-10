import Button1 from "@/src/components/common/Button1";
import Head1 from "@/src/components/common/Head1";
import ProgressBar from "@/src/components/common/ProgressBar";
import { Box } from "@/src/components/ui/box";
import { VStack } from "@/src/components/ui/vstack";
import { FlowType, SCREEN_HEAD_TEXT, SCREEN_NAMES } from "@/src/constants/progress";
import { selectIsLoggedOut } from "@/src/features/auth/selectors";
import { logout } from "@/src/features/auth/slice";
import { selectStep } from "@/src/features/progress/selectors";
import useProgress from "@/src/hooks/useProgress";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import ProfileIcon from "@/assets/svg/profile";
import { HStack } from "@/src/components/ui/hstack";

export default function AppLayout() {
    const dispatch = useDispatch();
    const router = useRouter();


    const isLoggedOut = useSelector(selectIsLoggedOut);
    const currentStep = useSelector(selectStep(FlowType.Details));

    // const {goNext} = useProgress({flow: FlowType.Details});


    const handleLogout = () => { // logoutun bulunduğu yere gelicek normalde
        dispatch(logout());
    }

    useEffect(() => { // tab layouta gelicek normalde
        if (isLoggedOut) {
            router.replace("/screens/auth/LoginScreen")
        }
    }, [isLoggedOut]);

    return (
        <VStack className={"h-full pb-24 pt-12 px-8 gap-20"}>
            <HStack className={"gap-5 items-center"}>
                {/*<IconButton icon={ChevronLeft} size={30}/>*/}
                <VStack className="gap-3 flex-1">
                    <Head1 size={"xl"} text={SCREEN_HEAD_TEXT.details[currentStep - 1]}/>
                    <ProgressBar value={(currentStep / SCREEN_NAMES.details.length) * 100} size={"lg"}/>
                </VStack>
            </HStack>
            <Slot/>
            {/*<Box className={"px-2"}>*/}
            {/*    <Button1 onPress={goNext} text={"Next"}/>*/}
            {/*</Box>*/}

            {/*<Button1 onPress={handleLogout} text={"logout"}/>*/}
        </VStack>
    );
}
