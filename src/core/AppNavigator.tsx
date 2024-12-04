import {useAuth} from "@/src/context/AuthProvider";
import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "@/app/screens/LoginScreen";
import AuthenticatedWrapper from "@/src/components/AuthenticatedWrapper";
import HomeScreen from "@/app/screens/HomeScreen";
import ProtectedScreen from "@/app/screens/ProtectedScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
    const {isAuthenticated} = useAuth(); // Auth-Status prüfen
    const [initialRoute, setInitialRoute] = useState<null | string>(null);

    useEffect(() => {
        if (isAuthenticated === null) return;
        setInitialRoute(isAuthenticated ? "HomeScreen" : "LoginScreen");
    }, [isAuthenticated]);

    if (initialRoute === null) {
        // Ladebildschirm während der Berechnung
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Checking authentication...</Text>
            </View>
        );
    }

    console.log("Initial route:", initialRoute)
    console.log("isAuthenticated:", isAuthenticated)

    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="HomeScreen">
                {() => (
                    <AuthenticatedWrapper>
                        <HomeScreen/>
                    </AuthenticatedWrapper>
                )}
            </Stack.Screen>
            <Stack.Screen name="ProtectedScreen">
                {() => (
                    <AuthenticatedWrapper>
                        <ProtectedScreen/>
                    </AuthenticatedWrapper>
                )}
            </Stack.Screen>

        </Stack.Navigator>
    );
};

export default AppNavigator;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2", // Optional: Anpassen an dein Theme
    },
    loadingText: {
        fontSize: 18,
        color: "#333",
    },
});
