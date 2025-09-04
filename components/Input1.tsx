import React from "react";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input";


interface Props {
    size?: "sm" | "md" | "lg";
    placeholder?: string;
    icon?: any;
    isDisabled?: boolean;
}

const Input1 = ({size,icon,isDisabled,placeholder}:Props) => {
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
            <InputField placeholder={placeholder} />
        </Input>
    )
}

export default Input1;
