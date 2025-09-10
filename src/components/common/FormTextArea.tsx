import {Input, InputField, InputIcon, InputSlot} from "@/src/components/ui/input";
import {AlertCircleIcon} from "lucide-react-native";
import React from "react";
import {Controller} from "react-hook-form";
import {
    FormControl,
    FormControlError, FormControlErrorIcon, FormControlErrorText,
    FormControlHelper,
    FormControlHelperText
} from "../ui/form-control";
import {Textarea, TextareaInput} from "@/src/components/ui/textarea";

interface Props {
    icon: any;
    size?: "sm" | "md" | "lg" | "xl";
    type?: "text" | "password" | "email" | "number" | "tel" | "url";
    helperText?: string;
    placeholder: string;
    name: string;
    control: any;
    fontFamily?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;

}

const FormTextArea1 = ({
                           fontFamily = "myFont",
                           isRequired,
                           isDisabled,
                           isReadOnly,
                           control,
                           name,
                           placeholder,
                           icon,
                           size,
                           helperText,
                           type = "text"
                       }: Props) => {
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
                            <Textarea className={"rounded-lg"}>
                                <TextareaInput className={""}
                                               size="md"
                                               style={{fontFamily: fontFamily}}
                                               type={type}
                                               placeholder={placeholder}
                                               value={value}
                                               onChangeText={onChange}
                                               onBlur={onBlur}
                                />
                            </Textarea>
                            {helperText && <FormControlHelper>
                                <FormControlHelperText style={{fontFamily: fontFamily}}>
                                    {helperText}
                                </FormControlHelperText>
                            </FormControlHelper>}
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

export default FormTextArea1;
