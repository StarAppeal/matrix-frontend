import React from "react";
import {StyleSheet} from "react-native";
import {Text} from "react-native-paper";
import {useTheme} from "@/src/context/ThemeProvider";

type Props = {
    children: React.ReactNode;
}

export default function ThemedHeader(props: Props) {
    const {theme} = useTheme();
    return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        fontWeight: "bold",
        paddingVertical: 12,
    },
});
