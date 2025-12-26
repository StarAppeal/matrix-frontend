import React from 'react';
import { Text, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useColors } from '@/src/hooks/useColors';

type ThemedCheckboxProps = {
    label: string;
    value: boolean;
    onValueChange: (newValue: boolean) => void;
    className?: string;
};

const ThemedCheckbox = ({ label, value, onValueChange, className }: ThemedCheckboxProps) => {
    const { colors } = useColors();

    return (
        <Pressable
            onPress={() => onValueChange(!value)}
            className={`flex-row items-center my-3 ${className || ''}`}
        >
            <Checkbox
                className="mr-2"
                value={value}
                onValueChange={onValueChange}
                color={value ? colors.primary : undefined}
            />
            <Text className="text-sm text-onSurface dark:text-onSurface-dark">
                {label}
            </Text>
        </Pressable>
    );
};

export default ThemedCheckbox;