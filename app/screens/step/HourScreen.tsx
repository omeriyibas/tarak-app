import React, {useCallback, useMemo, useState} from "react";
import RangeSlider1Hour from "@/src/components/common/RangeSlider1Hour";
import {Box} from "@/src/components/ui/box";
import Button1 from "@/src/components/common/Button1";
import {VStack} from "@/src/components/ui/vstack";
import useProgress from "@/src/hooks/useProgress";
import {FlowType} from "@/src/constants/progress";
import {createRangeHour} from "@/src/services/range-hour";


const HourScreen = () => {
    const [minValue, setMinValue] = useState(20);
    const [maxValue, setMaxValue] = useState(80);
    const {goNext} = useProgress({flow: FlowType.Details});


    const handleValuesChange = useCallback((min: number, max: number) => {
        setMinValue(min);
        setMaxValue(max);
    }, []);

    const percentToHour = useCallback((percent: number) => {
        const startHourBase = 6; // 06:00 start
        const totalHours = 20;   // covers until 26 -> 02:00 next day
        const hour = Math.round(startHourBase + (percent / 100) * totalHours);
        return Math.max(0, Math.min(26, hour));
    }, []);

    const handleNext = async () => {
        const start_hour = percentToHour(minValue);
        const end_hour = percentToHour(maxValue);
        await createRangeHour({ start_hour, end_hour });
        await goNext()
    }

    return (
        <VStack className={"justify-between flex-1"}>
            <Box className={"my-32 items-center justify-center"}>
                <RangeSlider1Hour
                    onValuesChange={handleValuesChange}
                />
            </Box>
            <Box className={"px-2"}>
                <Button1 onPress={handleNext} text={"Next"}/>
            </Box>
        </VStack>

    );
};

export default HourScreen;
