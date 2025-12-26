import React, { forwardRef } from "react";
import { Text, View } from "react-native";
import { TextInput as Input, TextInputProps } from "react-native-paper";

export type ThemedTextInputProps = TextInputProps & {
    errorText?: string;
    description?: string;
    error?: boolean;
    className?: string;
};

const ThemedTextInput = forwardRef<any, ThemedTextInputProps>(
    ({ errorText, description, error, className, ...props }, ref) => {
        if (error && !errorText) {
            console.log("ErrorText is missing! Please provide an errorText prop!");
        }

        return (
            <View className={`w-full my-3 ${className || ''}`}>
                <Input
                    underlineColor="transparent"
                    mode="outlined"
                    {...props}
                    ref={ref}
                />
                {description && !error ? (
                    <Text className="text-sm pt-2 text-onSurface dark:text-onSurface-dark">
                        {description}
                    </Text>
                ) : null}
                {error && (
                    <Text className="text-sm pt-2 text-error">
                        {errorText}
                    </Text>
                )}
            </View>
        );
    }
);

ThemedTextInput.displayName = 'ThemedTextInput';

export default ThemedTextInput;

