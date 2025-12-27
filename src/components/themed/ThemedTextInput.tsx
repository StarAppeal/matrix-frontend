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
            <View className={`w-full my-2 ${className || ''}`}>
                <Input
                    underlineColor="transparent"
                    mode="outlined"
                    className="rounded-xl bg-surface dark:bg-surface-dark"
                    {...props}
                    ref={ref}
                />
                {description && !error ? (
                    <Text className="text-sm pt-2 px-1 text-muted dark:text-muted-dark">
                        {description}
                    </Text>
                ) : null}
                {error && (
                    <View className="flex-row items-center pt-2 px-1">
                        <Text className="text-sm text-error font-medium">
                            {errorText}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
);

ThemedTextInput.displayName = 'ThemedTextInput';

export default ThemedTextInput;

