import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useDispatch} from "react-redux";
import {useRouter} from "expo-router";
import {loginThunk} from "@/src/features/auth/thunks";
import {AppDispatch} from "@/src/store/store";
import {Box} from "@/src/components/ui/box";
import LoginForm from "@/src/components/auth/LoginForm";
import {HStack} from "@/src/components/ui/hstack";
import Text1 from "@/src/components/common/Text1";
import ButtonLink from "@/src/components/common/buttonLink";
import {updateProgressThunk} from "@/src/features/progress/thunks";
import {FlowType} from "@/src/constants/progress";


const schema = z.object({
    phone_number: z.string("Telefon numarası boş bırakılmış"),
    password: z.string("Şifre boş bırakılmış").min(6, "Şifre en az 6 karakter olmalı"),
});


type FormValues = {
    phone_number: string;
    password: string;
};

const LoginScreen = () => {

    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    const {control, handleSubmit, getValues} = useForm<FormValues>({
        resolver: zodResolver(schema),

    });


    const loginHandle = async () => {
        const {...payload} = getValues();

        const res = await dispatch(loginThunk(payload));
        // const res = await dispatch(updateProgressThunk({flow:FlowType.Details,step:1}));
        console.log(res)
    }


    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            // keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <ScrollView>
                <Box className={"h-full px-5"}>
                    <LoginForm control={control} registerHandle={loginHandle} handleSubmit={handleSubmit}/>
                    <HStack className={"justify-center items-center gap-2"}>
                        {/*<Text style={{fontFamily:"Inter_400Regular"}} size={"lg"}>Hesabınız yok mu?</Text>*/}
                        <Text1 text={"Hesabınız yok mu?"} size={"lg"}/>
                        <ButtonLink onPress={() => router.push("/screens/auth/RegisterScreen")} text={"Hesap Oluştur"}/>
                    </HStack>
                </Box>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
