import { EyeIcon } from "@/src/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/src/components/ui/input";
import { AlertCircleIcon, EyeOffIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
    FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText,
    FormControlHelper,
    FormControlHelperText
} from "../ui/form-control";

interface Props {
    icon: any;
    size?: "sm" | "md" | "lg" | "xl";
    helperText?: string;
    placeholder: string;
    name: string;
    control: any;
    fontFamily?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;


}

const PasswordFormInput = ({
                               icon,
                               fontFamily = "myFont",
                               helperText,
                               placeholder,
                               isDisabled,
                               isRequired,
                               isReadOnly,
                               name,
                               control,
                               size
                           }: Props) => {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <Controller control={control} name={name}
                    render={({field: {onChange, onBlur, value}, fieldState: {error, isDirty}}) => (
                        <FormControl
                            isInvalid={!!error}
                            size={size}
                            isDisabled={isDisabled}
                            isReadOnly={isReadOnly}
                            isRequired={isRequired}
                        >
                            <Input className={"rounded-lg h-[6vh]"}
                                   size="md">
                                {icon && <InputSlot className="pl-3">
                                    <InputIcon as={icon}/>
                                </InputSlot>}
                                <InputField
                                    style={{fontFamily: fontFamily}}
                                    type={showPassword?"text":"password"}
                                    placeholder={placeholder}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />
                                <InputSlot className="pr-5"
                                           onPress={() => setShowPassword(prevState => !prevState)}>
                                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon}/>
                                </InputSlot>
                            </Input>
                            {
                                helperText && <FormControlHelper>
                                    <FormControlHelperText style={{fontFamily: fontFamily}}>
                                        {helperText}
                                    </FormControlHelperText>
                                </FormControlHelper>
                            }
                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500"/>
                                <FormControlErrorText className="text-red-500" style={{fontFamily: fontFamily}}>
                                    {error?.message}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>

                    )}/>
    );
};

export default PasswordFormInput;
