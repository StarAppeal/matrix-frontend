import React from 'react';
import { Pressable, View, Text } from 'react-native';

type Props = {
    color: [number, number, number];
    onPress: () => void;
    title?: string;
    className?: string;
};

const ThemedColorPickerButton = ({ color, onPress, title = "Farbe wählen", className }: Props) => {
    const rgbColor = `rgb(${color.join(',')})`;

    return (
        <Pressable
            className={`flex-row items-center py-3 px-4 rounded-xl border-2 gap-3 
                bg-surface dark:bg-surface-dark 
                border-outline dark:border-outline-dark 
                active:opacity-80
                ${className || ''}`}
            onPress={onPress}
        >
            <View
                className="w-8 h-8 rounded-lg border-2 border-white/30"
                style={{ backgroundColor: rgbColor }}
            />
            <Text className="text-base font-medium text-onSurface dark:text-onSurface-dark">{title}</Text>
        </Pressable>
    );
};

export default ThemedColorPickerButton;

