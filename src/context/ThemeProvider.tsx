import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {getThemeType, themes, ThemeType} from "@/src/core/theme";
import {getFromStorage, saveInStorage, THEME_KEY} from "@/src/utils/secureStorage";

type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [theme, setTheme] = useState<ThemeType>(themes.light);

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await getFromStorage(THEME_KEY);
            if (storedTheme) {
                setTheme(getThemeType(storedTheme));
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === themes.light ? themes.dark : themes.light;
        saveInStorage(THEME_KEY, newTheme.name).then(() => setTheme(newTheme));
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
