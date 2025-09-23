import React from 'react';
import { Pressable, View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/src/context/ThemeProvider';

type Props = {
    color: [number, number, number];
    onPress: () => void;
    title?: string;
    style?: StyleProp<ViewStyle>;
};

const ThemedColorPickerButton = ({ color, onPress, title = "Farbe wählen", style }: Props) => {
    const { theme } = useTheme();
    const rgbColor = `rgb(${color.join(',')})`;

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.outline
                },
                pressed && styles.pressed,
                style
            ]}
            onPress={onPress}
        >
            <View style={[styles.swatch, { backgroundColor: rgbColor }]} />
            <Text style={{ color: theme.colors.onSurface }}>{title}</Text>
        </Pressable>
    );
};

export default ThemedColorPickerButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 28,
        borderWidth: 1,
        gap: 12,
    },
    swatch: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    pressed: {
        opacity: 0.7,
    },
});