import ThemedBackground from "@/src/components/themed/ThemedBackground";
import {useState} from "react";
import ThemedTextInput from "@/src/components/themed/ThemedTextInput";
import ThemedButton from "@/src/components/themed/ThemedButton";
import {useAuth} from "@/src/context/AuthProvider";

import CustomColorPicker from "@/src/components/themed/CustomColorPicker";
import {View} from "react-native";

export default function TextScreen() {
    const {authenticatedUser} = useAuth();
    const [textProps, setTextProps] = useState(
        authenticatedUser?.lastState?.text! || { text: '', color: [255, 255, 255] }
    );
    return (
        <ThemedBackground>
            <View style={{ padding: 20, gap: 10 }}>
                <ThemedTextInput
                    label="Text"
                    returnKeyType="next"
                    value={textProps?.text}
                    onChangeText={(value: string) => {
                        setTextProps(prev => ({
                            ...prev,
                            text: value
                        }));
                    }}
                    autoCapitalize="none"
                />

                <CustomColorPicker
                    onSelect={rgb => setTextProps(prev => ({ ...prev!, color: rgb }))}
                    defaultColor={textProps.color}
                />
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <ThemedButton mode="contained" onPress={() => console.log(textProps)} title={"Cooler Knopf"} />
            </View>
        </ThemedBackground>
    );
}


