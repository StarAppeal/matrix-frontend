import React from "react";
import {ImageBackground, KeyboardAvoidingView, StyleSheet,} from "react-native";
import {useTheme} from "../../context/ThemeProvider";

type Props = {
    children: React.ReactNode;
}

export default function ThemedBackground({children}: Props) {
    const {theme} = useTheme();
    return (
        <ImageBackground
            source={require("../../../assets/items/dot.png")}
            resizeMode="repeat"
            style={[styles.background, {backgroundColor: theme.colors.surface}]}
        >
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
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
