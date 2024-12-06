import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {TextInput as Input} from "react-native-paper";
import {useTheme} from "@/src/context/ThemeProvider";

type Props = {
    errorText?: string;
    description?: string;
    error?: boolean;
    [x: string]: any;
};

export default function ThemedTextInput({errorText, description, error, ...props}: Props) {
    const {theme} = useTheme();


    if (error && !errorText) {
        console.log("ErrorText is missing! Please provide an errorText prop!");
    }

    const errorStyle = {
        fontSize: 13,
        color: theme.colors.error,
        paddingTop: 8,
    };

    return (
        <View style={styles.container}>
            <Input
                underlineColor="transparent"
                mode="outlined"
                {...props}
            />
            {description && !error ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {error && <Text style={errorStyle}>{errorText}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 12,
    },
    description: {
        fontSize: 13,
        paddingTop: 8,
    },
});
