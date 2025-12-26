import {MD3DarkTheme as DarkTheme, MD3LightTheme as DefaultTheme, MD3Theme} from "react-native-paper";

const { lightColors, darkColors } = require('@/src/core/colors');

export type CustomMD3Theme = MD3Theme & {
    colors: {
        success: string;
        onSuccess: string;
    };
};

export const lightTheme: CustomMD3Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: lightColors.primary,
        secondary: lightColors.secondary,
        background: lightColors.background,
        surface: lightColors.surface,
        error: lightColors.error,
        onPrimary: lightColors.onPrimary,
        onSecondary: lightColors.onSecondary,
        onBackground: lightColors.onBackground,
        onSurface: lightColors.onSurface,
        outline: lightColors.outline,
        success: lightColors.success,
        onSuccess: "#FFFFFF",
    },
};

export const darkTheme: CustomMD3Theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: darkColors.primary,
        secondary: darkColors.secondary,
        background: darkColors.background,
        surface: darkColors.surface,
        error: darkColors.error,
        onPrimary: darkColors.onPrimary,
        onSecondary: darkColors.onSecondary,
        onBackground: darkColors.onBackground,
        onSurface: darkColors.onSurface,
        outline: darkColors.outline,
        success: darkColors.success,
        onSuccess: "#FFFFFF",
    },
};
