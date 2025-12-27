import React, {ReactNode, useEffect} from "react";
import {Provider as PaperProvider} from "react-native-paper";
import {useThemeStore} from "@/src/stores/themeStore";
import {useColorScheme} from "nativewind";
import LoadingScreen from "@/src/components/LoadingScreen";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.hideAsync().catch(() => {});

export const ThemeProvider = ({children}: { children: ReactNode }) => {
    const { theme, isDark, isHydrated } = useThemeStore();
    const { setColorScheme } = useColorScheme();

    useEffect(() => {
        setColorScheme(isDark ? 'dark' : 'light');
    }, [isDark, setColorScheme]);

    if (!isHydrated) {
        return <LoadingScreen />;
    }

    return (
        <PaperProvider theme={theme}>{children}</PaperProvider>
    );
};

