import React from "react";
import {ImageBackground, KeyboardAvoidingView, StyleSheet,} from "react-native";
import {useTheme} from "../../context/ThemeProvider";
import {ThemeType} from "@/src/core/theme";

type Props = {
    children: React.ReactNode;
}

export default function ThemedBackground({children}: Props) {
    const {theme} = useTheme();
    const styles = createStyles(theme);
    return (
        <ImageBackground
            source={require("../../../assets/items/dot.png")}
            resizeMode="repeat"
            style={styles.background}
        >
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const createStyles = (theme: ThemeType) => {
    return StyleSheet.create({
        background: {
            flex: 1,
            width: "100%",
            backgroundColor: theme.colors.background,
        },
        container: {
            flex: 1,
            padding: 20,
            width: "100%",
            maxWidth: 340,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
        },
    });
}
