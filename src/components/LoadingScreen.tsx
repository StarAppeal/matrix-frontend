import React from "react";
import { View, ActivityIndicator } from "react-native";
import Logo from "./Logo";
import { useThemeStore } from "@/src/stores/themeStore";

export default function LoadingScreen() {
    const isDark = useThemeStore((state) => state.isDark);

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

