import { useColorScheme } from 'nativewind';

const { lightColors, darkColors } = require('@/src/core/colors');

export type ThemeColors = typeof lightColors;

export function useColors() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return {
        colors: isDark ? darkColors : lightColors,
        isDark,
        colorScheme,
    };
}

export const themeColors = {
    light: lightColors,
    dark: darkColors,
};

