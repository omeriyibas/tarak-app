import {
    FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText
} from "./ui/form-control";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input";
import {AlertCircleIcon, EyeOffIcon} from "lucide-react-native";
import {useState} from "react";
import {EyeIcon} from "@/components/ui/icon";

interface Props {
    icon:any;
    isInvalid?: boolean;
    size?: "sm" | "md" | "lg" | "xl";

}

const PasswordFormInput = ({isInvalid,size}:Props) => {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <FormControl
            isInvalid={isInvalid}
            size={size}
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
        >
            <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" size="md">
                <InputField
                    type="password"
                    placeholder="password"
                    // value={inputValue}
                    // onChangeText={(text) => setInputValue(text)}
                />
                <InputSlot className="pr-3" onPress={()=>setShowPassword(prevState => !prevState)}>
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
            </Input>
            <FormControlHelper>
                <FormControlHelperText>
                    Must be at least 6 characters.
                </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                <FormControlErrorText className="text-red-500">
                    At least 6 characters are required.
                </FormControlErrorText>
            </FormControlError>
        </FormControl>
    );
};

export default PasswordFormInput;
