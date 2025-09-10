import React from "react";
import { Button, ButtonText } from "../ui/button";



interface Props {
    onPress: () => void;
    text: string;
    fontFamily?:string;
    size?: "sm" | "md" | "lg";
}

const Button1 = ({size="lg",onPress,text,fontFamily="myFont"}:Props) => (
    <Button onPress={onPress} size={size} className={"w-full h-14 rounded-2xl active:scale-95 duration-0 transition-all"}>
        <ButtonText style={{fontFamily:fontFamily}}>{text}</ButtonText>
    </Button>
)

export default Button1;
