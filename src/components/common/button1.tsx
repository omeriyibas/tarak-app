import {Button, ButtonText} from "../ui/button";
import React from "react";



interface Props {
    onPress: () => void;
    text: string;
    fontFamily?:string;
}

const Button1 = ({onPress,text,fontFamily="myFont"}:Props) => (
    <Button onPress={onPress} size="lg" className={"w-full h-14 rounded-2xl"}>
        <ButtonText style={{fontFamily:fontFamily}}>{text}</ButtonText>
    </Button>
)

export default Button1;
