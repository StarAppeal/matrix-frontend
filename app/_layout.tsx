import React from "react";


import {AuthProvider} from "@/src/context/AuthProvider";
import {ThemeProvider} from "@/src/context/ThemeProvider";
import CustomStack from "@/src/core/Stack";


export default function Layout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <CustomStack />
            </AuthProvider>
        </ThemeProvider>
    );
}
