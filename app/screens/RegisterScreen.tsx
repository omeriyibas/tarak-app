import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import {Box} from "@/components/ui/box";
import Input1 from "@/components/Input1";
import {KeyIcon, Mail, PhoneIcon} from "lucide-react-native";
import ProfileIcon from "@/assets/svg/profile";
import FormInput from "@/components/FormInput";
import Button1 from "@/components/button1";
import ButtonLink from "@/components/buttonLink";
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";
import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
    email: z.email("Geçerli bir email girmen lazım"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalı")
});
export type FormValues = z.infer<typeof schema>;

const RegisterScreen = () => {

    const {control, handleSubmit, watch} = useForm<FormValues>({
        resolver: zodResolver(schema),
        // mode: "onChange",
        // reValidateMode: "onChange",

    });


    const registerHandle = () => {
        console.log(watch("email"));
    }


    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            // keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <ScrollView>
                <Box className={"h-full px-5"}>
                    <VStack>
                        <Box className={"h-24"}/>
                        <Heading size={"3xl"}>Register</Heading>
                        <Box className={"h-10"}/>
                            <FormInput name={"name_surname"} control={control}  size={"lg"} icon={ProfileIcon}
                                       placeholder={"Name"}/>
                            <Box className={"h-5"}/>
                            <FormInput name={"email"} size={"lg"} icon={Mail} placeholder={"Email (İsteğe Bağlı)"}
                                       control={control}/>
                            <Box className={"h-5"}/>
                            <FormInput name={"phone_number"} control={control} size={"lg"} icon={PhoneIcon} placeholder={"Telefon Numarası"}/>
                            <Box className={"h-5"}/>
                            <FormInput name={"password"} control={control} size={"lg"} icon={KeyIcon} helperText={"en az altı karakter olmalı"}
                                       placeholder={"Parola"}/>
                            <Box className={"h-5"}/>
                            <FormInput name={"password2"} control={control} size={"lg"} icon={KeyIcon} helperText={"en az altı karakter olmalı"}
                                       placeholder={"Parola (Tekrar)"}/>

                            {/*<Box className={"h-10"}/>*/}
                            <Box className={"p-10"}>
                                <Button1 text={"Kayıt Ol"} onPress={handleSubmit(registerHandle)}/>
                            </Box>

                        {/*<CheckBox1 text={"Remember me"}/>*/}
                        {/*<Box className={"h-[3vh]"}/>*/}
                        <HStack className={"justify-center items-center gap-2"}>
                            <Text size={"lg"}>Hesabınız yok mu?</Text>
                            <ButtonLink onPress={()=>console.log("as")}  text={"Hesap Oluştur"}/>
                        </HStack>


                    </VStack>
                </Box>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;
