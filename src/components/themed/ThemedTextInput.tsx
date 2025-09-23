import React, { forwardRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput as Input, TextInputProps } from "react-native-paper";
import { useTheme } from "@/src/context/ThemeProvider";

export type ThemedTextInputProps = TextInputProps & {
    errorText?: string;
    description?: string;
    error?: boolean;
};

const ThemedTextInput = forwardRef<any, ThemedTextInputProps>(
    ({ errorText, description, error, ...props }, ref) => {
        const { theme } = useTheme();

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
                    ref={ref}
                />
                {description && !error ? (
                    <Text style={styles.description}>{description}</Text>
                ) : null}
                {error && <Text style={errorStyle}>{errorText}</Text>}
            </View>
        );
    }
);

export default ThemedTextInput;

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
