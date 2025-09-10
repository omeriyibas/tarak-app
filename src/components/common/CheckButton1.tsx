import {Button, ButtonGroup, ButtonIcon, ButtonText} from "../ui/button";
import React from "react";
import {twMerge} from "tailwind-merge";


interface Props {
    onPress: any;
    text: string;
    fontFamily?: string;
    size?: "sm" | "md" | "lg";
    icon: any;
    active?: boolean;
}

const CheckButton1 = ({size, text, fontFamily = "myFont", icon, onPress, active}: Props) => (

    <Button onPress={onPress} size={size} variant={"outline"}
            className={twMerge("w-full h-full rounded-2xl justify-between px-8 bg-transparent transition-[border-color] duration-200 ease-in-out border-2",active?" border-primary-400":" border-gray-300")}>
        <ButtonText className={twMerge("transition-[color] duration-200",active?"text-primary-500":"text-gray-300")} style={{fontFamily: fontFamily}}>{text}</ButtonText>
        {/*<ButtonSpinner />*/}
        <ButtonIcon width={24} height={24} as={icon}  />
    </Button>

    // <Button onPress={onPress} size="lg" className={"w-full h-14 rounded-2xl active:scale-95 duration-0 transition-all"}>
    //     <ButtonText style={{fontFamily:fontFamily}}>{text}</ButtonText>
    // </Button>
)

export default CheckButton1;
