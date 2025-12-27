import React from "react";
import { Button as PaperButton } from "react-native-paper";
import { IconSource } from "react-native-paper/src/components/Icon";

type Props = {
    mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
    style?: any;
    children?: React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
    title: string;
    icon?: IconSource;
    className?: string;
    compact?: boolean;
};

export default function ThemedButton({ mode, style, title, icon, className, compact, disabled, ...props }: Props) {
    // Basis-Klassen für alle Buttons
    const baseClasses = "my-2 rounded-xl";

    // Mode-spezifische Klassen
    const modeClasses = {
        contained: disabled
            ? "bg-muted dark:bg-muted-dark"
            : "bg-primary dark:bg-primary-light",
        outlined: "bg-transparent border-2 border-primary dark:border-primary-light",
        elevated: "bg-surface dark:bg-surface-dark shadow-card",
        "contained-tonal": "bg-primary/20 dark:bg-primary-light/20",
        text: "bg-transparent",
    };

    return (
        <PaperButton
            className={`${baseClasses} ${modeClasses[mode]} ${compact ? 'py-0' : 'py-1'} ${className || ''}`}
            style={style}
            mode={mode}
            icon={icon}
            disabled={disabled}
            {...props}
        >
            {title}
        </PaperButton>
    );
}


