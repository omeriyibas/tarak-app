import React from "react";
import {Input, InputField, InputIcon, InputSlot} from "@/src/components/ui/input";


interface Props {
    size?: "sm" | "md" | "lg";
    placeholder?: string;
    icon?: any;
    isDisabled?: boolean;
    fontFamily?:string;
}

const Input1 = ({fontFamily="myFont",size,icon,isDisabled,placeholder}:Props) => {
    return(
        <Input
            variant="outline"
            size={size}
            isDisabled={isDisabled}
            className={"rounded-lg h-[6vh]"}
            // isInvalid={false}
            // isReadOnly={false}
        >
            {icon&&<InputSlot className="pl-3">
                <InputIcon as={icon}/>
            </InputSlot>}
            <InputField style={{fontFamily:fontFamily}} placeholder={placeholder} />
        </Input>
    )
}

export default Input1;
