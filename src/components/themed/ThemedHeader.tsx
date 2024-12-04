import React from "react";
import {StyleSheet} from "react-native";
import {Text} from "react-native-paper";
import {useTheme} from "@/src/context/ThemeProvider";
import {ThemeType} from "@/src/core/theme";

type Props = {
    children: React.ReactNode;
}

export default function ThemedHeader(props: Props) {
    const {theme} = useTheme();
    const styles = createStyles(theme);
    return <Text style={styles.header} {...props} />;
}

const createStyles = (theme: ThemeType) => {
    return StyleSheet.create({
        header: {
            fontSize: 21,
            color: theme.colors.primary,
            fontWeight: "bold",
            paddingVertical: 12,
        },
    });
}
