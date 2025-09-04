import {Center} from "@/components/ui/center";
import {Text} from "@/components/ui/text";
import {useRouter} from "expo-router";
import {useEffect} from "react";

export default function Home() { //yükleme ekranı

    const router = useRouter();

    useEffect(() => {
        // Only navigate after the root layout is ready
        router.replace("/screens/RegisterScreen");
        // router.replace("/screen/ProductScreen");
    }, []);

    return (
        <Center className={"h-full"}>
            <Text size={"4xl"} className={"text-center"}>Loading...</Text>
        </Center>
    );
}
