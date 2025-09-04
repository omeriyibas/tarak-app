import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import 'react-native-reanimated';
import { useEffect, useState } from "react";
import { Slot, SplashScreen, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import "@/global.css"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    const [styleLoaded, setStyleLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false); // Add this state to track readiness

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
            setIsReady(true); // Mark layout as ready once fonts are loaded
        }
    }, [loaded]);

    if (!isReady) {
        return null; // Wait until everything is ready
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {

    return (
        <GluestackUIProvider>
            <Slot />
        </GluestackUIProvider>
    );
}
