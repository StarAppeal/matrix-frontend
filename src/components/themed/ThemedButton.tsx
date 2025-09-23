import React from "react";
import {StyleSheet} from "react-native";
import { Button as PaperButton } from "react-native-paper";
import {useTheme} from "@/src/context/ThemeProvider";
import {IconSource} from "react-native-paper/src/components/Icon";

type Props = {
    mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal"
    style?: any;
    children?: React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
    title: string;
    icon?: IconSource;
}

export default function ThemedButton({mode, style, title, icon, ...props}: Props) {
    const {theme} = useTheme();
    return (
        <PaperButton
            style={[
                styles.button,
                mode === "outlined" && {backgroundColor: theme.colors.background},
                style,
            ]}
            labelStyle={styles.text}
            mode={mode}
            icon={icon}
            {...props}
        >
            {title}
        </PaperButton>
    );
}

const styles =
    StyleSheet.create({
        button: {
            marginVertical: 10,
            paddingVertical: 2,
        },
        text: {
            fontWeight: "bold",
            fontSize: 15,
            lineHeight: 26,
        },
    });

