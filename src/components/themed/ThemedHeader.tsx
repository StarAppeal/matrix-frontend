import React from "react";
import { Text } from "react-native-paper";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function ThemedHeader({ children, className, ...props }: Props) {
    return (
        <Text
            className={`text-xl font-bold py-3 ${className || ''}`}
            {...props}
        >
            {children}
        </Text>
    );
}

