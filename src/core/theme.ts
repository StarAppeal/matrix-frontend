import { MD3LightTheme as DefaultTheme, MD3DarkTheme as DarkTheme, MD3Theme } from "react-native-paper";

export const lightTheme: MD3Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        // add more colors here if you want to change some
        },
};

export const darkTheme: MD3Theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        // add more colors here if you want to change some
    },
};
