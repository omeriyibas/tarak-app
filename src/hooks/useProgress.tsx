import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "expo-router";
import {updateProgressThunk} from "@/src/features/progress/thunks";
import {FlowType, SCREEN_NAMES} from "@/src/constants/progress";
import {selectStep} from "@/src/features/progress/selectors";


type Props = {flow:FlowType}

const useProgress = ({flow}:Props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const currentStep = useSelector(selectStep(flow));
    const [nextStep, setNextStep] = useState(null)

    const goNext = async () => {
        const newStep = currentStep + 1;
        const res = await dispatch(updateProgressThunk({flow: flow, step: newStep}));
        setNextStep(newStep)
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

    return {
        nextStep,
        goNext
    }


}
export default useProgress;
