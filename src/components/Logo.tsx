import React from "react";
import { Image, View } from "react-native";

type Props = {
    className?: string;
    size?: "small" | "medium" | "large";
};

export default function Logo({ className, size = "medium" }: Props) {
    const sizeClasses = {
        small: "w-16 h-16",
        medium: "w-28 h-28",
        large: "w-40 h-40",
    };

    return (
        <View className={`items-center justify-center mb-4 ${className || ''}`}>
            <Image
                source={require("../../assets/items/logo.png")}
                className={`${sizeClasses[size]} rounded-3xl shadow-glow`}
                resizeMode="contain"
            />
        </View>
    );
}

