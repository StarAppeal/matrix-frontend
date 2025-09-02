import ThemedHeader from "@/src/components/themed/ThemedHeader";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import {useState} from "react";
import ThemedTextInput from "@/src/components/themed/ThemedTextInput";
import ThemedButton from "@/src/components/themed/ThemedButton";
import {useAuth} from "@/src/context/AuthProvider";

import CustomColorPicker from "@/src/components/themed/CustomColorPicker";

export default function TextScreen() {
    const {authenticatedUser} = useAuth();
    const [textProps, setTextProps] = useState(authenticatedUser?.lastState.text);

    return (
        <ThemedBackground>
            <ThemedHeader>
                Text mode
            </ThemedHeader>
            {/* TextArea if I allow enough characters */}
            <ThemedTextInput
                label="Text"
                returnKeyType="next"
                value={textProps?.text}
                onChangeText={(value: string) => {
                    setTextProps(prev => ({
                        ...prev!,
                        text: value
                    }));
                }}
                autoCapitalize="none"
            />

            <CustomColorPicker onSelect={rgb => console.log(rgb)} defaultColor={textProps!.color} />

            <ThemedButton mode={"contained"} onPress={() => console.log(textProps)}>
                Cooler Knopf
            </ThemedButton>
        </ThemedBackground>
    );
}


