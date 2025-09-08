import {Redirect, router, Slot, useRouter} from "expo-router";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {selectIsAuthenticated} from "@/src/features/auth/selectors";
import {VStack} from "@/src/components/ui/vstack";
import {Box} from "@/src/components/ui/box";
import {bootstrapProgress} from "@/src/bootstrap/progress";
import {selectStep} from "@/src/features/progress/selectors";
import {FlowType, SCREEN_NAMES} from "@/src/constants/progress";

export default function AppLayout() {
    // const router=useRouter();
    const isAuth = useSelector(selectIsAuthenticated);
    const step = useSelector(selectStep(FlowType.Details));
    const router = useRouter();

    // console.log(isAuth)

    useEffect(() => {
        const run = async () => {
            await bootstrapProgress();

        };
        if (isAuth) {
            run();
        }
    }, [isAuth]);

    useEffect(() => {
        if (step !== 0 && isAuth) {
            router.replace("/screens/step/" + SCREEN_NAMES.details[step - 1])
        }
    }, [step,isAuth]);


    return (
        <VStack className={"h-full justify-between"}>
            {/*<Box className={"mt-[5vh] justify-center px-5 h-14"}>*/}
            {/*    <TopBar/>*/}
            {/*</Box>*/}
            <Box className={"h-full"}>
                <Slot/>
            </Box>
        </VStack>

    );
}
