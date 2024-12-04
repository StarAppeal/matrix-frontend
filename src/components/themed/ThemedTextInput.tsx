import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {TextInput as Input} from "react-native-paper";
import {useTheme} from "@/src/context/ThemeProvider";
import {ThemeType} from "@/src/core/theme";


type Props = {
    errorText?: string;
    description?: string;
    [x: string]: any;
}

export default function ThemedTextInput({errorText, description, ...props}: Props) {
    const {theme} = useTheme();
    const styles = createStyles(theme);
    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                {...props}
            />
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
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
        },
        description: {
            fontSize: 13,
            color: theme.colors.secondary,
            paddingTop: 8,
        },
        error: {
            fontSize: 13,
            color: theme.colors.error,
            paddingTop: 8,
        },
    });

}
