import React from "react";
import {useAuth} from "@/src/stores/authStore";
import NotAuthenticated from "@/src/components/NotAuthenticated";
import { ActivityIndicator, View } from "react-native";

const AuthenticatedWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {isAuthenticated, loading, authenticatedUser, isHydrated} = useAuth();

    if (!isHydrated || loading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!isAuthenticated || !authenticatedUser) {
        return <NotAuthenticated />;
    }

    return <>{children}</>;
};

export default AuthenticatedWrapper;
