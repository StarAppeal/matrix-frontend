export type ThemeType = {
    colors: {
        background: string;
        text: string;
        primary: string;
        secondary: string;
        error: string;
    };
    spacing: (factor: number) => number;
    name: string;
};

const lightTheme: ThemeType = {
    colors: {
        background: "#ffffff",
        text: "#000000",
        primary: "#6200ee",
        secondary: "#03dac6",
        error: "#b00020",
    },
    spacing: (factor: number) => factor * 8, // Beispiel für dynamische Abstände+
    name: "light",
};

const darkTheme: ThemeType = {
    colors: {
        background: "#121212",
        text: "#ffffff",
        primary: "#bb86fc",
        secondary: "#03dac6",
        error: "#cf6679",
    },
    spacing: (factor: number) => factor * 8,
    name: "dark",
};

export const themes = {light: lightTheme, dark: darkTheme};

export function getThemeType(theme: string): ThemeType {
    if (theme === "light") {
        return lightTheme;
    }
    return darkTheme;
}
