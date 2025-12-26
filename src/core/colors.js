// Single source of truth for all theme colors
// Imported by: tailwind.config.js, useColors.ts, theme.ts

const colors = {
    primary: {
        DEFAULT: '#6750A4',
        light: '#7F67BE',
        dark: '#4F378B',
    },
    secondary: {
        DEFAULT: '#625B71',
        light: '#7A7289',
        dark: '#4A4458',
    },
    surface: {
        DEFAULT: '#FFFBFE',
        dark: '#1C1B1F',
    },
    background: {
        DEFAULT: '#FFFBFE',
        dark: '#1C1B1F',
    },
    error: {
        DEFAULT: '#B3261E',
        light: '#DC362E',
        dark: '#8C1D18',
    },
    success: {
        DEFAULT: '#4CAF50',
        light: '#66BB6A',
        dark: '#388E3C',
    },
    onPrimary: {
        DEFAULT: '#FFFFFF',
        dark: '#1C1B1F',
    },
    onSecondary: {
        DEFAULT: '#FFFFFF',
        dark: '#1C1B1F',
    },
    onSurface: {
        DEFAULT: '#1C1B1F',
        dark: '#E6E1E5',
    },
    onBackground: {
        DEFAULT: '#1C1B1F',
        dark: '#E6E1E5',
    },
    outline: {
        DEFAULT: '#79747E',
        dark: '#938F99',
    },
};

module.exports = { colors };

// Flat structure for JS access
const lightColors = {
    primary: colors.primary.DEFAULT,
    primaryLight: colors.primary.light,
    primaryDark: colors.primary.dark,
    secondary: colors.secondary.DEFAULT,
    secondaryLight: colors.secondary.light,
    secondaryDark: colors.secondary.dark,
    surface: colors.surface.DEFAULT,
    background: colors.background.DEFAULT,
    error: colors.error.DEFAULT,
    errorLight: colors.error.light,
    errorDark: colors.error.dark,
    success: colors.success.DEFAULT,
    successLight: colors.success.light,
    successDark: colors.success.dark,
    onPrimary: colors.onPrimary.DEFAULT,
    onSecondary: colors.onSecondary.DEFAULT,
    onSurface: colors.onSurface.DEFAULT,
    onBackground: colors.onBackground.DEFAULT,
    outline: colors.outline.DEFAULT,
};

const darkColors = {
    primary: colors.primary.light,
    primaryLight: colors.primary.DEFAULT,
    primaryDark: colors.primary.dark,
    secondary: colors.secondary.light,
    secondaryLight: colors.secondary.DEFAULT,
    secondaryDark: colors.secondary.dark,
    surface: colors.surface.dark,
    background: colors.background.dark,
    error: colors.error.light,
    errorLight: colors.error.DEFAULT,
    errorDark: colors.error.dark,
    success: colors.success.light,
    successLight: colors.success.DEFAULT,
    successDark: colors.success.dark,
    onPrimary: colors.onPrimary.dark,
    onSecondary: colors.onSecondary.dark,
    onSurface: colors.onSurface.dark,
    onBackground: colors.onBackground.dark,
    outline: colors.outline.dark,
};

module.exports.lightColors = lightColors;
module.exports.darkColors = darkColors;

