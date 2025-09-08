import PasswordFormInput from "@/src/components/auth/PasswordFormInput";
import Button1 from "@/src/components/common/button1";
import FormInput from "@/src/components/common/FormInput";
import Head1 from "@/src/components/common/Head1";
import { Box } from "@/src/components/ui/box";
import { VStack } from "@/src/components/ui/vstack";
import ProfileIcon from "@/assets/svg/profile";
import { KeyIcon, Mail, PhoneIcon } from "lucide-react-native";


interface Props {
    control: any;
    registerHandle: any;
    handleSubmit:any;
}

const RegisterForm = ({control,registerHandle,handleSubmit}:Props) => {
    return (
        <VStack>
            <Box className={"h-24"}/>
            <Head1 text={"Kullanıcı Kaydı"} size={"3xl"}/>
            <Box className={"h-10"}/>
            <FormInput name={"full_name"} control={control} size={"lg"} icon={ProfileIcon}
                       placeholder={"İsim Soyisim"}/>
            <Box className={"h-5"}/>
            <FormInput name={"email"} size={"lg"} icon={Mail} placeholder={"Email (İsteğe Bağlı)"}
                       control={control}/>
            <Box className={"h-5"}/>
            <FormInput name={"phone_number"} control={control} size={"lg"} icon={PhoneIcon}
                       placeholder={"Telefon Numarası"}/>
            <Box className={"h-5"}/>
            <PasswordFormInput name={"password"} control={control} size={"lg"} icon={KeyIcon}
                       helperText={"en az altı karakter olmalı"}
                       placeholder={"Parola"}/>
            <Box className={"h-5"}/>
            <PasswordFormInput name={"confirmPassword"} control={control} size={"lg"} icon={KeyIcon}
                       helperText={"en az altı karakter olmalı"}
                       placeholder={"Parola (Tekrar)"}/>

            {/*<Box className={"h-10"}/>*/}
            <Box className={"p-10"}>
                <Button1  text={"Kayıt Ol"} onPress={handleSubmit(registerHandle)}/>
            </Box>
        </VStack>
    );
};

export default RegisterForm;
