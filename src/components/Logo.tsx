import React from "react";
import { Image } from "react-native";

type Props = {
    className?: string;
};

export default function Logo({ className }: Props) {
    return (
        <Image
            source={require("../../assets/items/logo.png")}
            className={`w-28 h-28 mb-2 ${className || ''}`}
        />
    );
}

