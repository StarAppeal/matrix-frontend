import React from "react";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {useTheme} from "@/src/context/ThemeProvider";

type Props = {
    goBack: () => void;
}

export default function BackButton({goBack}: Props) {
    const {theme} = useTheme();
    return (
        <TouchableOpacity onPress={goBack} style={styles.container}>
            <Image
                style={[styles.image, {tintColor: theme.colors.onBackground}]}
                source={require("../../assets/items/back.png")}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 10 + getStatusBarHeight(),
        left: 4,
    },
    image: {
        width: 24,
        height: 24,
    },
});
