// Single source of truth for all theme colors
// Imported by: tailwind.config.js, useColors.ts, theme.ts
// Modern, vibrant color palette with better contrast

const colors = {
    primary: {
        DEFAULT: '#6366F1', // Indigo - modern & vibrant
        light: '#818CF8',
        dark: '#4F46E5',
    },
    secondary: {
        DEFAULT: '#8B5CF6', // Purple accent
        light: '#A78BFA',
        dark: '#7C3AED',
    },
    tertiary: {
        DEFAULT: '#EC4899', // Pink for highlights
        light: '#F472B6',
        dark: '#DB2777',
    },
    surface: {
        DEFAULT: '#FAFAFA',
        dark: '#18181B',
        elevated: '#FFFFFF',
        elevatedDark: '#27272A',
    },
    background: {
        DEFAULT: '#F4F4F5',
        dark: '#09090B',
    },
    card: {
        DEFAULT: '#FFFFFF',
        dark: '#1C1C1E',
    },
    error: {
        DEFAULT: '#EF4444',
        light: '#F87171',
        dark: '#DC2626',
    },
    success: {
        DEFAULT: '#10B981', // Emerald green
        light: '#34D399',
        dark: '#059669',
    },
    warning: {
        DEFAULT: '#F59E0B', // Amber
        light: '#FBBF24',
        dark: '#D97706',
    },
    info: {
        DEFAULT: '#3B82F6', // Blue
        light: '#60A5FA',
        dark: '#2563EB',
    },
    onPrimary: {
        DEFAULT: '#FFFFFF',
        dark: '#FFFFFF',
    },
    onSecondary: {
        DEFAULT: '#FFFFFF',
        dark: '#FFFFFF',
    },
    onSurface: {
        DEFAULT: '#18181B',
        dark: '#FAFAFA',
    },
    onBackground: {
        DEFAULT: '#27272A',
        dark: '#E4E4E7',
    },
    outline: {
        DEFAULT: '#D4D4D8',
        dark: '#3F3F46',
    },
    muted: {
        DEFAULT: '#71717A',
        dark: '#A1A1AA',
    },
    accent: {
        DEFAULT: '#F0ABFC', // Light purple glow
        dark: '#C026D3',
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
    tertiary: colors.tertiary.DEFAULT,
    tertiaryLight: colors.tertiary.light,
    tertiaryDark: colors.tertiary.dark,
    surface: colors.surface.DEFAULT,
    surfaceElevated: colors.surface.elevated,
    background: colors.background.DEFAULT,
    card: colors.card.DEFAULT,
    error: colors.error.DEFAULT,
    errorLight: colors.error.light,
    errorDark: colors.error.dark,
    success: colors.success.DEFAULT,
    successLight: colors.success.light,
    successDark: colors.success.dark,
    warning: colors.warning.DEFAULT,
    warningLight: colors.warning.light,
    warningDark: colors.warning.dark,
    info: colors.info.DEFAULT,
    infoLight: colors.info.light,
    infoDark: colors.info.dark,
    onPrimary: colors.onPrimary.DEFAULT,
    onSecondary: colors.onSecondary.DEFAULT,
    onSurface: colors.onSurface.DEFAULT,
    onBackground: colors.onBackground.DEFAULT,
    outline: colors.outline.DEFAULT,
    muted: colors.muted.DEFAULT,
    accent: colors.accent.DEFAULT,
};

const darkColors = {
    primary: colors.primary.light,
    primaryLight: colors.primary.DEFAULT,
    primaryDark: colors.primary.dark,
    secondary: colors.secondary.light,
    secondaryLight: colors.secondary.DEFAULT,
    secondaryDark: colors.secondary.dark,
    tertiary: colors.tertiary.light,
    tertiaryLight: colors.tertiary.DEFAULT,
    tertiaryDark: colors.tertiary.dark,
    surface: colors.surface.dark,
    surfaceElevated: colors.surface.elevatedDark,
    background: colors.background.dark,
    card: colors.card.dark,
    error: colors.error.light,
    errorLight: colors.error.DEFAULT,
    errorDark: colors.error.dark,
    success: colors.success.light,
    successLight: colors.success.DEFAULT,
    successDark: colors.success.dark,
    warning: colors.warning.light,
    warningLight: colors.warning.DEFAULT,
    warningDark: colors.warning.dark,
    info: colors.info.light,
    infoLight: colors.info.DEFAULT,
    infoDark: colors.info.dark,
    onPrimary: colors.onPrimary.dark,
    onSecondary: colors.onSecondary.dark,
    onSurface: colors.onSurface.dark,
    onBackground: colors.onBackground.dark,
    outline: colors.outline.dark,
    muted: colors.muted.dark,
    accent: colors.accent.dark,
};

module.exports.lightColors = lightColors;
module.exports.darkColors = darkColors;

