import ThemedBackground from "@/src/components/themed/ThemedBackground";
import { useState } from "react";
import ThemedTextInput from "@/src/components/themed/ThemedTextInput";
import ThemedButton from "@/src/components/themed/ThemedButton";
import { useAuth } from "@/src/context/AuthProvider";
import ColorSelector from "@/src/components/themed/ColorSelector";
import { View, StyleSheet } from "react-native";
import ThemedSegmentedButtons from "@/src/components/themed/ThemedSegmentedButtons";
import { MatrixState } from '@/src/model/User';

type TextProps = MatrixState['text'];

export default function TextScreen() {
    const { authenticatedUser } = useAuth();

    const [textProps, setTextProps] = useState<TextProps>(
        authenticatedUser?.lastState?.text || {
            text: '',
            color: [255, 255, 255],
            align: 'center',
            speed: 50,
            size: 16,
        }
    );

    const updateTextProp = (prop: Partial<TextProps>) => {
        setTextProps(prev => ({ ...prev, ...prop }));
    };

    return (
        <ThemedBackground>
            <View style={styles.contentWrapper}>
                <View style={styles.inputGroup}>
                    <ThemedTextInput
                        label="Text"
                        value={textProps.text}
                        onChangeText={(text) => updateTextProp({ text })}
                    />

                    <ColorSelector
                        onSelect={(color) => updateTextProp({ color })}
                        defaultColor={textProps.color}
                    />

                    <ThemedSegmentedButtons
                        value={textProps.align}
                        onValueChange={(align) => updateTextProp({ align })}
                        options={{
                            left: 'Links',
                            center: 'Mitte',
                            right: 'Rechts',
                        }}
                    />
                </View>

                <View style={styles.actionGroup}>
                    <ThemedButton
                        mode="contained"
                        onPress={() => console.log(textProps)}
                        title={"An die Matrix senden"}
                    />
                </View>
            </View>
        </ThemedBackground>
    );
}

const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    inputGroup: {
        gap: 15,
    },
    actionGroup: {
    }
});