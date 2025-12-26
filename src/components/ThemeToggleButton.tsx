import React from "react";
import {useThemeStore} from "@/src/stores/themeStore";
import SwitchWithIcons from "react-native-switch-with-icons";
import {darkTheme, lightTheme} from "@/src/core/theme";

export default function ThemeToggleButton() {
    const {isDark, toggleTheme} = useThemeStore();

    return (
        <SwitchWithIcons
            value={isDark}
            onValueChange={toggleTheme}
            icon={{true: require("../../assets/items/moon.svg"), false: require("../../assets/items/sun.svg")}}
            thumbColor={{true: darkTheme.colors.surfaceVariant, false: lightTheme.colors.surfaceVariant}}
            iconColor={{true: darkTheme.colors.onSurfaceVariant, false: lightTheme.colors.onSurfaceVariant}}
            trackColor={{true: darkTheme.colors.secondary, false: lightTheme.colors.secondary}}
        />
    )
}
