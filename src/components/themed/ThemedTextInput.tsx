import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {TextInput as Input} from "react-native-paper";
import {useTheme} from "@/src/context/ThemeProvider";
import {ThemeType} from "@/src/core/theme";
import {MD3Colors} from "react-native-paper/src/types";

type Props = {
    errorText?: string;
    description?: string;
    error?: boolean;
    [x: string]: any;
};

export default function ThemedTextInput({errorText, description, error, ...props}: Props) {
    const {theme} = useTheme();
    const styles = createStyles(theme);
    // Umwandlung deines Themes für react-native-paper
    const paperTheme = {
        colors: {
            primary: theme.colors.primary,
            text: theme.colors.text,
            background: theme.colors.background,
            placeholder: theme.colors.secondary, // Placeholder-Farbe
            error: theme.colors.error,
            secondary: theme.colors.secondary,
        },
    };

    if (error && !errorText) {
        console.log("ErrorText is missing! Please provide an errorText prop!");
    }

    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                selectionColor={theme.colors.primary} // Cursorfarbe
                underlineColor="transparent"
                mode="outlined"
                theme={paperTheme} // Hier wird das Theme angewandt
                {...props}
            />
            {description && !error ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {error && <Text style={styles.error}>{errorText}</Text> }
        </View>
    );
}

const createStyles = (theme: ThemeType) => {
    return StyleSheet.create({
        container: {
            width: "100%",
            marginVertical: 12,
        },
        input: {
            backgroundColor: theme.colors.background,
            color: theme.colors.text, // Textfarbe im Eingabefeld
        },
        description: {
            fontSize: 13,
            color: theme.colors.primary,
            paddingTop: 8,
        },
        error: {
            fontSize: 13,
            color: theme.colors.error,
            paddingTop: 8,
        },
    });
};
