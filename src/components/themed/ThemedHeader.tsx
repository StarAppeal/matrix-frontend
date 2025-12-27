import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";

type Props = {
    children: React.ReactNode;
    className?: string;
    subtitle?: string;
    centered?: boolean;
};

export default function ThemedHeader({ children, className, subtitle, centered = false, ...props }: Props) {
    return (
        <View className={`mb-2 ${centered ? 'items-center' : ''}`}>
            <Text
                className={`text-2xl font-bold tracking-tight py-2 text-onSurface dark:text-onSurface-dark ${className || ''}`}
                {...props}
            >
                {children}
            </Text>
            {subtitle && (
                <Text className="text-sm text-muted dark:text-muted-dark mt-1">
                    {subtitle}
                </Text>
            )}
        </View>
    );
}

