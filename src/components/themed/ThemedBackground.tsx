import React from "react";
import { ImageBackground, KeyboardAvoidingView, Platform } from "react-native";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function ThemedBackground({ children, className }: Props) {
    return (
        <ImageBackground
            source={require("../../../assets/items/dot.png")}
            resizeMode="repeat"
            className="flex-1 w-full bg-background dark:bg-background-dark"
        >
            <KeyboardAvoidingView
                className={`flex-1 p-5 w-[90%] max-w-[600px] self-center ${className || ''}`}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

