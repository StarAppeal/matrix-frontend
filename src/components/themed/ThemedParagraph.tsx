import React from "react";
import { Text } from "react-native-paper";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function ThemedParagraph({ children, className, ...props }: Props) {
    return (
        <Text
            className={`text-base leading-6 text-center mb-3 ${className || ''}`}
            {...props}
        >
            {children}
        </Text>
    );
}

