import React from "react";
import {StyleSheet, Text} from "react-native";
import {Button as PaperButton} from "react-native-paper";
import {useTheme} from "@/src/context/ThemeProvider";

type Props = {
    mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal"
    style?: any;
    children?: React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
    title: string;
}

export default function ThemedButton({mode, style, title, ...props}: Props) {
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
            {...props}
        >
            <Text>{title}</Text>
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

