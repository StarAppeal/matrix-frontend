import React, { useRef, useState } from "react";
import { TextInput, Platform } from "react-native";
import ThemedTextInput, { ThemedTextInputProps } from "@/src/components/themed/ThemedTextInput";
import { TextInput as PaperTextInput } from "react-native-paper";

export default function PasswordInput(props: ThemedTextInputProps) {
    const [hidePass, setHidePass] = useState(true);
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);
    const inputRef = useRef<TextInput>(null);

    const isWeb = Platform.OS === "web";

    const handleCursorReset = () => {
        if (cursorPosition === null || isWeb) return;
        setTimeout(() => {
            inputRef.current?.setNativeProps({
                selection: { start: cursorPosition, end: cursorPosition },
            });
        }, 0);
    };

    return (
        <ThemedTextInput
            {...props}
            value={props.value}
            secureTextEntry={hidePass}
            ref={inputRef}
            onChangeText={(input) => {
                props.onChangeText?.(input);
            }}
            autoCapitalize="none"
            onSelectionChange={(e) => {
                setCursorPosition(e.nativeEvent.selection.start);
            }}
            right={
                !isWeb ? (
                    <PaperTextInput.Icon
                        icon={hidePass ? "eye" : "eye-off"}
                        onPress={() => {
                            setHidePass(!hidePass);
                            handleCursorReset();
                        }}
                    />
                ) : undefined
            }
        />
    );
}
