import React from "react";
import {useAuth} from "@/src/stores/authStore";
import NotAuthenticated from "@/src/components/NotAuthenticated";
import LoadingScreen from "@/src/components/LoadingScreen";

const AuthenticatedWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {isAuthenticated, loading, authenticatedUser, isHydrated} = useAuth();

    if (!isHydrated || loading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated || !authenticatedUser) {
        return <NotAuthenticated />;
    }

    return <>{children}</>;
};

export default AuthenticatedWrapper;
