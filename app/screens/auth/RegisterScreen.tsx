import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useDispatch} from "react-redux";
import {router, useRouter} from "expo-router";
import {registerThunk} from "@/src/features/auth/thunks";
import {Box} from "@/src/components/ui/box";
import RegisterForm from "@/src/components/auth/RegisterForm";
import {HStack} from "@/src/components/ui/hstack";
import Text1 from "@/src/components/common/Text1";
import ButtonLink from "@/src/components/common/buttonLink";
import {AppDispatch} from "@/src/store/store";


const schema = z.object({
    // email: z.email("Geçerli bir email girmen lazım"),
    password: z.string("Şifre boş bırakılmış").min(6, "Şifre en az 6 karakter olmalı"),
    confirmPassword: z.string("Şifre boş bırakılmış").min(6, "Şifre en az 6 karakter olmalı")
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Şifreler eşleşmiyor",
        path: ["confirmPassword"],
    });


type FormValues = {
    email?: string;
    password: string;
    confirmPassword:string;
};

const RegisterScreen = () => {
    const dispatch = useDispatch<AppDispatch>();

    const router=useRouter();

    const {control, handleSubmit, getValues} = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: ""
        }
        // mode: "onChange",
        // reValidateMode: "onChange",

    });


    const registerHandle = async () => {
        const { confirmPassword, ...payload } = getValues();

        // const res = dispatch(registerThunk(payload));
        dispatch(registerThunk(payload));


        router.replace("/screens/asd");

    }


    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            // keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <ScrollView>
                <Box className={"h-full px-5"}>
                    <RegisterForm control={control} registerHandle={registerHandle} handleSubmit={handleSubmit}/>
                    <HStack className={"justify-center items-center gap-2"}>
                        {/*<Text style={{fontFamily:"Inter_400Regular"}} size={"lg"}>Hesabınız yok mu?</Text>*/}
                        {/*<Text1 text={"Hesabınız var mı?"} size={"lg"} fontFamily={""}/>*/}
                        <Text1 text={"Hesabınız var mı?"} size={"lg"}/>
                        <ButtonLink onPress={() => router.replace("/screens/auth/LoginScreen")} text={"Giriş Yap"}/>
                    </HStack>
                </Box>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;
