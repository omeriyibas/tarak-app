import {useEffect, useState} from "react";
import {Slot, SplashScreen} from "expo-router";
import {useFonts} from "expo-font";
import "@/global.css"
import {Inter_400Regular, Inter_700Bold} from "@expo-google-fonts/inter";
import {Provider} from "react-redux";
import {bootstrapAuth} from "@/src/bootstrap/auth";
import {bootstrapProgress} from "@/src/bootstrap/progress";
import store from "@/src/store/store";
import {GluestackUIProvider} from "@/src/components/ui/gluestack-ui-provider";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


    let [fontsLoaded, error] = useFonts({
        myFont: Inter_400Regular,
        myFontBold: Inter_700Bold,
        // Inter_400Regular
    });


    // const [styleLoaded, setStyleLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false); // Add this state to track readiness

    useEffect(() => {
        if (error) throw error;
    }, [error]);



    useEffect(() => {
        let alive = true;
        (async () => {
            if (!fontsLoaded) return;
            // 1) Kimlik kontrolü (depodan token çek, gerekiyorsa refresh)
            await bootstrapAuth();

            await bootstrapProgress()



            if (alive) {
                await SplashScreen.hideAsync();
                setIsReady(true);
            }
        })();
        return () => {
            alive = false;
        };
    }, [fontsLoaded]);

    if (!isReady) {
        return null; // Wait until everything is ready
    }

    return <RootLayoutNav/>;
}

function RootLayoutNav() {

    return (
        <GluestackUIProvider>
            <Provider store={store}>
                <Slot/>
            </Provider>
        </GluestackUIProvider>
    );
}
