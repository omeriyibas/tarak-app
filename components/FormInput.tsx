import {
    FormControl,
    FormControlError, FormControlErrorIcon, FormControlErrorText,
    FormControlHelper,
    FormControlHelperText
} from "./ui/form-control";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input";
import {AlertCircleIcon} from "lucide-react-native";
import React from "react";
import {Controller} from "react-hook-form";

interface Props {
    icon: any;
    size?: "sm" | "md" | "lg" | "xl";
    type?: any;
    helperText?: string;
    placeholder: string;
    name: string;
    control: any;

}

const FormInput = ({control, name, placeholder, icon, size, helperText, type = "text"}: Props) => {
    return (

        <Controller control={control} name={name} render={({field: {onChange, onBlur, value}, fieldState: {error,isDirty}}) => (
            <FormControl
                isInvalid={!!error}
                size={size}
                isDisabled={false}
                isReadOnly={false}
                isRequired={false}
            >
                <Input className={"rounded-lg h-[6vh]"}
                       size="md">
                    {icon && <InputSlot className="pl-3">
                        <InputIcon as={icon}/>
                    </InputSlot>}
                    <InputField
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                    />
                </Input>
                {helperText && <FormControlHelper>
                    <FormControlHelperText>
                        {helperText}
                    </FormControlHelperText>
                </FormControlHelper>}
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500"/>
                    <FormControlErrorText className="text-red-500">
                        At least 6 characters are required.
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>

        )}/>
    );
};

export default FormInput;
