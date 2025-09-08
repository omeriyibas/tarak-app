import {Button, ButtonText} from "../ui/button";
import React from "react";

interface Props {
    onPress: ()=>void;
    text: string;
    size?: number;
    fontFamily?:string;
}

const ButtonLink = ({onPress,text,size,fontFamily="myFont"}:Props) => (
    <Button onPress={onPress} size={size} variant={"link"} >
        <ButtonText style={{fontFamily:fontFamily}} className={"text-secondary-400"}>{text}</ButtonText>
    </Button>
)

export default ButtonLink;
