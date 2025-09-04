import {Button, ButtonText} from "../components/ui/button";
import React from "react";

interface Props {
    onPress: ()=>void;
    text: string;
    size?: number;
}

const ButtonLink = ({onPress,text,size}:Props) => (
    <Button onPress={onPress} size={size} variant={"link"} >
        <ButtonText className={"text-pink-500"}>{text}</ButtonText>
    </Button>
)

export default ButtonLink;
