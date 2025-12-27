import React, { useEffect } from "react";
import {useAuth} from "@/src/stores/authStore";
import {useThemeStore} from "@/src/stores/themeStore";
import NotAuthenticated from "@/src/components/NotAuthenticated";
import LoadingScreen from "@/src/components/LoadingScreen";
import * as SplashScreen from 'expo-splash-screen';

const AuthenticatedWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {isAuthenticated, loading, authenticatedUser, isHydrated: authHydrated} = useAuth();
    const {isHydrated: themeHydrated} = useThemeStore();

    // Verstecke den Splash Screen erst wenn beide Stores hydratiert sind
    useEffect(() => {
        if (authHydrated && themeHydrated) {
            SplashScreen.hideAsync().catch(() => {});
        }
    }, [authHydrated, themeHydrated]);

    // Zeige nichts (Splash Screen bleibt) bis beide Stores hydratiert sind
    if (!authHydrated || !themeHydrated) {
        return null;
    }

    // Zeige LoadingScreen während Auth Status geprüft wird
    if (loading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated || !authenticatedUser) {
        return <NotAuthenticated />;
    }

    return <>{children}</>;
};

export default AuthenticatedWrapper;
