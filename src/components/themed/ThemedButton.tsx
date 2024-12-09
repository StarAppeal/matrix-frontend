import React from "react";
import {StyleSheet} from "react-native";
import {Button as PaperButton} from "react-native-paper";
import {useTheme} from "@/src/context/ThemeProvider";

type Props = {
    mode: "text" | "outlined" | "contained";
    style?: any;
    children: React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
}

export default function ThemedButton({mode, style, ...props}: Props) {
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
        />
    );
}

const styles =
    StyleSheet.create({
        button: {
            width: "100%",
            marginVertical: 10,
            paddingVertical: 2,
        },
        text: {
            fontWeight: "bold",
            fontSize: 15,
            lineHeight: 26,
        },
    });

