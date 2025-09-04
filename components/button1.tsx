import {Button, ButtonText} from "../components/ui/button";
import React from "react";



interface Props {
    onPress: () => void;
    text: string;
}

const Button1 = ({onPress,text}:Props) => (
    <Button onPress={onPress} size="lg" className={"w-full h-14 rounded-2xl"} style={{backgroundColor:"red"}} >
        <ButtonText>{text}</ButtonText>
    </Button>
)

export default Button1;
