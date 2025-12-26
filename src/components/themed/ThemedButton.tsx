import React from "react";
import { Button as PaperButton } from "react-native-paper";
import { IconSource } from "react-native-paper/src/components/Icon";
import { useColors } from "@/src/hooks/useColors";

type Props = {
    mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
    style?: any;
    children?: React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
    title: string;
    icon?: IconSource;
    className?: string;
};

export default function ThemedButton({ mode, style, title, icon, className, ...props }: Props) {
    const { colors } = useColors();

    return (
        <PaperButton
            className={`my-2.5 py-0.5 ${className || ''}`}
            style={[
                mode === "outlined" && { backgroundColor: colors.background },
                style,
            ]}
            labelStyle={{ fontWeight: "bold", fontSize: 15, lineHeight: 26 }}
            mode={mode}
            icon={icon}
            {...props}
        >
            {title}
        </PaperButton>
    );
}


