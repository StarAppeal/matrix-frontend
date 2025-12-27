import React, {ReactNode, useEffect} from "react";
import {adaptNavigationTheme, Provider as PaperProvider} from "react-native-paper";
import {useThemeStore} from "@/src/stores/themeStore";
import {useColorScheme} from "nativewind";
import SplashScreenComponent from "@/src/components/SplashScreenComponent";

import { ThemeProvider as NavThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import {View} from "react-native";


export const ThemeProvider = ({children}: { children: ReactNode }) => {
    const { theme, isDark, isHydrated } = useThemeStore();
    const { setColorScheme } = useColorScheme();

    const { LightTheme: NavLightTheme, DarkTheme: NavDarkTheme } = adaptNavigationTheme({
        reactNavigationLight: DefaultTheme,
        reactNavigationDark: DarkTheme,
    });

    const navigationTheme = isDark ? NavDarkTheme : NavLightTheme;

    useEffect(() => {
        setColorScheme(isDark ? 'dark' : 'light');
    }, [isDark, setColorScheme, isHydrated]);

    if (!isHydrated) {
        return <SplashScreenComponent />;
    }

    return (
        <NavThemeProvider value={navigationTheme}>
            <PaperProvider theme={theme}>
                <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                    {children}
                </View>
            </PaperProvider>
        </NavThemeProvider>
    );
};

