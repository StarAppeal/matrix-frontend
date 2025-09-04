import React from "react";
import {useAuth} from "@/src/context/AuthProvider";
import NotAuthenticated from "@/src/components/NotAuthenticated";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const AuthenticatedWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {isAuthenticated, loading, authenticatedUser} = useAuth();

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!isAuthenticated || !authenticatedUser) {
        return <NotAuthenticated />;
        // return <Redirect href={"/login"} />;
    }

    return <>{children}</>;
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
export default AuthenticatedWrapper;
