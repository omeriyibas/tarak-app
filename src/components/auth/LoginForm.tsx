import PasswordFormInput from "@/src/components/auth/PasswordFormInput";
import Button1 from "@/src/components/common/button1";
import FormInput from "@/src/components/common/FormInput";
import Head1 from "@/src/components/common/Head1";
import { Box } from "@/src/components/ui/box";
import { VStack } from "@/src/components/ui/vstack";
import { KeyIcon, PhoneIcon } from "lucide-react-native";


interface Props {
    control: any;
    registerHandle: any;
    handleSubmit:any;
}

const LoginForm = ({control,registerHandle,handleSubmit}:Props) => {
    return (
        <VStack>
            <Box className={"h-24"}/>
            <Head1 text={"Kullanıcı Girişi"} size={"3xl"}/>
            <Box className={"h-10"}/>
            <FormInput name={"phone_number"} control={control} size={"lg"} icon={PhoneIcon}
                       placeholder={"Telefon Numarası"}/>
            <Box className={"h-5"}/>
            <PasswordFormInput name={"password"} control={control} size={"lg"} icon={KeyIcon}
                       helperText={"en az altı karakter olmalı"}
                       placeholder={"Parola"}/>

            {/*<Box className={"h-10"}/>*/}
            <Box className={"p-10"}>
                <Button1  text={"Giriş Yap"} onPress={handleSubmit(registerHandle)}/>
            </Box>


        </VStack>
    );
};

export default LoginForm;
