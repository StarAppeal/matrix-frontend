import React from 'react';
import { Text, Pressable, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useColors } from '@/src/hooks/useColors';

type ThemedCheckboxProps = {
    label: string;
    value: boolean;
    onValueChange: (newValue: boolean) => void;
    className?: string;
    description?: string;
};

const ThemedCheckbox = ({ label, value, onValueChange, className, description }: ThemedCheckboxProps) => {
    const { colors } = useColors();

    return (
        <Pressable
            onPress={() => onValueChange(!value)}
            className={`flex-row items-center my-2 py-3 rounded-xl ${value ? 'bg-primary/10 dark:bg-primary-light/10' : ''} active:opacity-80 ${className || ''}`}
        >
            <Checkbox
                className="mr-3 w-6 h-6 rounded-md"
                value={value}
                onValueChange={onValueChange}
                color={value ? colors.primary : undefined}
            />
            <View className="flex-1">
                <Text className="text-base font-medium text-onSurface dark:text-onSurface-dark">
                    {label}
                </Text>
                {description && (
                    <Text className="text-sm text-muted dark:text-muted-dark mt-0.5">
                        {description}
                    </Text>
                )}
            </View>
        </Pressable>
    );
};

export default ThemedCheckbox;