import React from 'react';
import { Pressable, View, Text, StyleProp, ViewStyle } from 'react-native';

type Props = {
    color: [number, number, number];
    onPress: () => void;
    title?: string;
    style?: StyleProp<ViewStyle>;
    className?: string;
};

const ThemedColorPickerButton = ({ color, onPress, title = "Farbe wählen", style, className }: Props) => {
    const rgbColor = `rgb(${color.join(',')})`;

    return (
        <Pressable
            className={`flex-row items-center py-3 px-4 rounded-3xl border gap-3 
                bg-surface dark:bg-surface-dark 
                border-outline dark:border-outline-dark 
                ${className || ''}`}
            style={style}
            onPress={onPress}
        >
            <View
                className="w-6 h-6 rounded border border-white/50"
                style={{ backgroundColor: rgbColor }}
            />
            <Text className="text-onSurface dark:text-onSurface-dark">{title}</Text>
        </Pressable>
    );
};

export default ThemedColorPickerButton;

