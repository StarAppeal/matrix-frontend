import React from "react";
import "../global.css";

import {ThemeProvider} from "@/src/context/ThemeProvider";
import CustomStack from "@/src/core/Stack";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function Layout() {
    return (
        <ThemeProvider>
            <CustomStack />
        </ThemeProvider>
    );
}
