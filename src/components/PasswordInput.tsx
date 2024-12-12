import React, { useRef, useState } from "react";
import { TextInput, Platform } from "react-native";
import ThemedTextInput, { ThemedTextInputProps } from "@/src/components/themed/ThemedTextInput";
import { TextInput as PaperTextInput } from "react-native-paper";

export default function PasswordInput(props: ThemedTextInputProps) {
    const [hidePass, setHidePass] = useState(true);
    const [text, setText] = useState(""); // Textinhalt verwalten
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);
    const inputRef = useRef<TextInput>(null);

    const handleCursorReset = () => {
        if (cursorPosition === null) return;

        if (Platform.OS === "web") {
            // Für Web: `setSelectionRange` verwenden
            setTimeout(() => {
                const inputElement = document.activeElement as HTMLInputElement;
                if (inputElement) {
                    inputElement.setSelectionRange(cursorPosition, cursorPosition);
                }
            }, 0);
        } else {
            // Für mobile Plattformen: `setNativeProps` verwenden
            setTimeout(() => {
                inputRef.current?.setNativeProps({
                    selection: { start: cursorPosition, end: cursorPosition },
                });
            }, 0);
        }
    };

    return (
        <ThemedTextInput
            {...props}
            label="Password"
            value={text} // Textwert
            secureTextEntry={hidePass}
            ref={inputRef} // Referenz hinzufügen
            onChangeText={(input) => {
                setText(input);
            }}
            onSelectionChange={(e) => {
                // Cursor-Position speichern
                setCursorPosition(e.nativeEvent.selection.start);
            }}
            right={
                <PaperTextInput.Icon
                    icon={hidePass ? "eye" : "eye-off"}
                    onPress={() => {
                        setHidePass(!hidePass);
                        handleCursorReset(); // Cursor-Position zurücksetzen
                    }}
                />
            }
        />
    );
}
