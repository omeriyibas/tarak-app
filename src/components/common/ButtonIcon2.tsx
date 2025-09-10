import React from "react";
import {Button, ButtonIcon, ButtonText} from "../ui/button";



interface Props {
    onPress: () => void;
    text: string;
    fontFamily?:string;
    size?: "sm" | "md" | "lg";
    icon:any;
}

const ButtonIcon2 = ({icon,size="lg",onPress,text,fontFamily="myFont"}:Props) => (
    <Button onPress={onPress} size={size} className={"bg-transparent border-primary-400 border-2 gap-5 w-full h-14 rounded-2xl active:scale-95 duration-0 transition-all"}>
        <ButtonText className={"w-32 text-primary-500"} style={{fontFamily:fontFamily}}>{text}</ButtonText>
        <ButtonIcon color={"green"} as={icon} size={size} />
    </Button>
)

export default ButtonIcon2;
