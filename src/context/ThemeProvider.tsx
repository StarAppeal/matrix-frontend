import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Provider as PaperProvider} from "react-native-paper";
import {getFromStorage, saveInStorage, THEME_KEY} from "@/src/utils/secureStorage";
import {CustomMD3Theme, darkTheme, lightTheme} from "@/src/core/theme";

type ThemeContextType = {
    theme: CustomMD3Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: { children: ReactNode }) => {
    const [theme, setTheme] = useState<CustomMD3Theme>();

    useEffect(() => {
        getFromStorage(THEME_KEY).then((theme) => {
            if (theme === "dark") {
                setTheme(darkTheme);
            } else {
                setTheme(lightTheme);
            }
        });
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === lightTheme ? darkTheme : lightTheme;
        setTheme(newTheme);
        saveInStorage(THEME_KEY, newTheme === lightTheme ? "light" : "dark");
    }

    if (!theme) {
        // maybe show a loading spinner here
        return <></>;
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <PaperProvider theme={theme}>{children}</PaperProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme muss innerhalb eines ThemeProviders verwendet werden");
    }
    return context;
};
