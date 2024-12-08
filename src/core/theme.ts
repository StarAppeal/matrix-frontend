import {MD3DarkTheme as DarkTheme, MD3LightTheme as DefaultTheme, MD3Theme} from "react-native-paper";

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
        primary: DefaultTheme.colors.primary,
        success: "#4CAF50", // Standard Erfolgsfarbe
        onSuccess: "#FFFFFF", // Schriftfarbe auf Success-Hintergrund
    },
};

export const darkTheme: CustomMD3Theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        success: "#388E3C", // Dunklere Erfolgsfarbe
        onSuccess: "#FFFFFF", // Schriftfarbe auf Success-Hintergrund
    },
};
