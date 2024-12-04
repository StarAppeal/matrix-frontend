import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import {AuthProvider} from "@/src/context/AuthProvider";
import {ThemeProvider} from "@/src/context/ThemeProvider";
import AppNavigator from "@/src/core/AppNavigator";

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </AuthProvider>
        </ThemeProvider>
    );
}
