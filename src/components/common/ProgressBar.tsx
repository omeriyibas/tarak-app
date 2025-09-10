import {Progress, ProgressFilledTrack} from "@/src/components/ui/progress";
import {SCREEN_NAMES} from "@/src/constants/progress";
import {number} from "zod";


type Props = {
    value: number;
    size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number

}

const ProgressBar = ({size,value}:Props) => {
    return (
        <Progress value={value} size={size} orientation="horizontal">
            <ProgressFilledTrack/>
        </Progress>
    );
};

export default ProgressBar;
