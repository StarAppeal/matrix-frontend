import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useColorScheme } from "nativewind";
import Logo from "./Logo";

export default function LoadingScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <View
            className="flex-1 items-center justify-center"
            style={{
                backgroundColor: isDark ? '#121212' : '#ffffff'
            }}
        >
            <Logo size="large" />
            <ActivityIndicator
                size="large"
                color={isDark ? '#BB86FC' : '#6200EE'}
                style={{ marginTop: 20 }}
            />
        </View>
    );
}

