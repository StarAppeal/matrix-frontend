import React from "react";


import {AuthProvider} from "@/src/context/AuthProvider";
import {ThemeProvider} from "@/src/context/ThemeProvider";
import {Stack} from "expo-router";


export default function Layout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Stack
                    screenOptions={{
                        headerShown: false
                    }}
                />
            </AuthProvider>
        </ThemeProvider>
    );
}
