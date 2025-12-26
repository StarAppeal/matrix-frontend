import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useColors } from "@/src/hooks/useColors";

type Props = {
    goBack: () => void;
    className?: string;
};

export default function BackButton({ goBack, className }: Props) {
    const { colors } = useColors();
    const statusBarHeight = getStatusBarHeight();

    return (
        <TouchableOpacity
            onPress={goBack}
            className={`absolute left-1 ${className || ''}`}
            style={{ top: 10 + statusBarHeight }}
        >
            <Image
                className="w-6 h-6"
                style={{ tintColor: colors.onBackground }}
                source={require("../../assets/items/back.png")}
            />
        </TouchableOpacity>
    );
}

