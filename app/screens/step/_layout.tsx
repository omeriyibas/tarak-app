import {Slot, useRouter} from "expo-router";
import {VStack} from "@/src/components/ui/vstack";
import Button1 from "@/src/components/common/button1";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@/src/features/auth/slice";
import {Box} from "@/src/components/ui/box";
import {selectIsAuthenticated, selectIsLoggedOut} from "@/src/features/auth/selectors";
import {useEffect,useState} from "react";
import {selectStep} from "@/src/features/progress/selectors";
import {FlowType, SCREEN_NAMES} from "@/src/constants/progress";
import {updateProgressThunk} from "@/src/features/progress/thunks";

export default function AppLayout() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [nextStep, setNextStep] = useState(null)


    const isLoggedOut = useSelector(selectIsLoggedOut);
    const currentStep = useSelector(selectStep(FlowType.Details));


    const handleLogout = () => { // logoutun bulunduğu yere gelicek normalde
        dispatch(logout());
    }

    useEffect(() => { // tab layouta gelicek normalde
        if (isLoggedOut) {
            router.replace("/screens/auth/LoginScreen")
        }
    }, [isLoggedOut]);

    const goNext = async () => {
        const nextStep = currentStep + 1;
        const res = await dispatch(updateProgressThunk({flow: FlowType.Details, step: nextStep}));
        setNextStep(nextStep)
        // console.log(res)
        // if (res?)
        // console.log(res)
        // router.replace("/screens/step/" + SCREEN_NAMES.details[currentStep - 1])
    }
    //
    useEffect(() => {
        if (nextStep) {
            router.replace("/screens/step/" + SCREEN_NAMES.details[currentStep - 1])
        }
    }, [nextStep]);

    console.log(currentStep)


    return (
        <VStack className={"h-full justify-center gap-5"}>
            <Slot/>
            <VStack className={"px-32 gap-3"}>
                <Button1 onPress={goNext} text={"Next"}/>
                <Button1 onPress={handleLogout} text={"logout"}/>
            </VStack>
        </VStack>
    );
}
