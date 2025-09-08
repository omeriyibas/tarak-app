import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "@/src/features/auth/selectors";
import {selectStep} from "@/src/features/progress/selectors";
import {FlowType, SCREEN_NAMES} from "@/src/constants/progress";
import {Redirect, useRouter} from "expo-router";
import {useEffect} from "react";


export default function Home() { //yükleme ekranı

    const router = useRouter();
    //
    // useEffect(() => {
    //     // Only navigate after the root layout is ready
    //
    //
    //     router.replace("/screens/auth/RegisterScreen");
    //
    //
    // }, []);
    //
    // return (
    //     <Center className={"h-full"}>
    //         <Text size={"4xl"} className={"text-center"}>Loading...</Text>
    //     </Center>
    // );


    const isAuth = useSelector(selectIsAuthenticated);
    const step = useSelector(selectStep(FlowType.Details));

    // useEffect(() => {
    //     // console.log(step)
    //     if (step!==0){
    //         router.replace(`/screens/step/${SCREEN_NAMES.details[step - 1]}`)
    //     }
    // }, [step]);


    if (isAuth) {
        if (step !== 0) {
            return <Redirect href={"/screens/step/" + SCREEN_NAMES.details[step-1]}/>
        }else {
            return <Redirect href={"/asd" + SCREEN_NAMES.details[step-1]}/>

        }
    } else {
        return <Redirect href="/screens/auth/RegisterScreen"/>
    }
}
