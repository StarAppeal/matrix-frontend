import React from 'react';
import {  Text, StyleSheet, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useTheme } from '@/src/context/ThemeProvider';

type ThemedCheckboxProps = {
    label: string;
    value: boolean;
    onValueChange: (newValue: boolean) => void;
    style?: object;
};

const ThemedCheckbox = ({ label, value, onValueChange, style }: ThemedCheckboxProps) => {
    const { theme } = useTheme();

    const componentStyles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12,
        },
        checkbox: {
            marginRight: 8,
        },
        label: {
            fontSize: 14,
            color: theme.colors.onSurface,
        },
    });

    return (
        <Pressable onPress={() => onValueChange(!value)} style={[componentStyles.container, style]}>
            <Checkbox
                style={componentStyles.checkbox}
                value={value}
                onValueChange={onValueChange}
                color={value ? theme.colors.primary : undefined} // Setzt die Farbe aus dem Theme
            />
            <Text style={componentStyles.label}>{label}</Text>
        </Pressable>
    );
};

export default ThemedCheckbox;