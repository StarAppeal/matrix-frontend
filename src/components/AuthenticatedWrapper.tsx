import React, { useEffect } from "react";
import {useAuth} from "@/src/stores/authStore";
import {useThemeStore} from "@/src/stores/themeStore";
import NotAuthenticated from "@/src/components/NotAuthenticated";
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenComponent from "@/src/components/SplashScreenComponent";

const AuthenticatedWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {isAuthenticated, loading, authenticatedUser, isHydrated: authHydrated} = useAuth();
    const {isHydrated: themeHydrated} = useThemeStore();

    useEffect(() => {
        if (authHydrated && themeHydrated) {
            SplashScreen.hideAsync().catch(() => {});
        }
    }, [authHydrated, themeHydrated]);

    if (!authHydrated || !themeHydrated || loading) {
        return <SplashScreenComponent/>;
    }

    if (!isAuthenticated || !authenticatedUser) {
        return <NotAuthenticated />;
    }

    return <>{children}</>;
};

export default AuthenticatedWrapper;
