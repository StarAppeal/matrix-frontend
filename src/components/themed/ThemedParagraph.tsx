import React from "react";
import {StyleSheet} from "react-native";
import {Text} from "react-native-paper";
import {ThemeType} from "@/src/core/theme";
import {useTheme} from "@/src/context/ThemeProvider";

type Props = {
    children: React.ReactNode;
};

export default function ThemedParagraph(props: Props) {
    const {theme} = useTheme();
    const styles = createStyles(theme);
    return <Text style={styles.text} {...props} />;
}

const createStyles = (theme: ThemeType) => {
    return StyleSheet.create({
        text: {
            color: theme.colors.text,
            fontSize: 15,
            lineHeight: 21,
            textAlign: "center",
            marginBottom: 12,
        },
    });
}

