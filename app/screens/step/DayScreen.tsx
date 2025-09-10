import {VStack} from "@/src/components/ui/vstack";
import {FlowType} from "@/src/constants/progress";
import useProgress from "@/src/hooks/useProgress";
import CheckButton1 from "@/src/components/common/CheckButton1";
import CheckIcon from "@/assets/svg/check";
import CheckDeactiveIcon from "@/assets/svg/check-deactive";
import {act, useState} from "react";
import {DAYS} from "@/src/constants/register-details";
import {Box} from "@/src/components/ui/box";
import Button1 from "@/src/components/common/Button1";
import {DaysTuple, updateDays} from "@/src/services/days";


const DayScreen = () => {
    const {goNext} = useProgress({flow: FlowType.Details});

    const [actives, setActives] = useState(DAYS.map(() => false));

    const handleActivate = (index: number) => {
        const newActives = [...actives];
        newActives[index] = !newActives[index];
        setActives(newActives);
    }

    const handleNext = () => {
        updateDays(actives as DaysTuple).then(async () => {
                await goNext();
            }
        )
    }

    return (
        <VStack className={"justify-between flex-1"}>
            <VStack className={"gap-5"}>
                {DAYS.map((day, index) => (
                    <Box className={"h-12"}>
                        <CheckButton1 key={index} onPress={() => handleActivate(index)} active={actives[index]}
                                      text={day}
                                      icon={actives[index] ? CheckIcon : CheckDeactiveIcon}/>
                    </Box>
                ))}
                {/*<Text1 text={"Screen 1"}/>*/}
            </VStack>
            <Box className={"px-2"}>
                <Button1 onPress={handleNext} text={"Next"}/>
            </Box>
        </VStack>
    );
};

export default DayScreen;
