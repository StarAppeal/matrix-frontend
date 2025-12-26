import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ThemedTextInput from "@/src/components/themed/ThemedTextInput";
import ThemedButton from "@/src/components/themed/ThemedButton";
import ColorSelector from "@/src/components/themed/ColorSelector";
import {View} from "react-native";
import ThemedSegmentedButtons from "@/src/components/themed/ThemedSegmentedButtons";
import { MatrixState } from '@/src/model/User';
import { useMatrixStore } from "@/src/stores";

type TextProps = MatrixState['text'];

export default function TextScreen() {
    const textConfig = useMatrixStore((s) => s.matrixState.text);
    const updateTextConfig = useMatrixStore((s) => s.updateTextConfig);
    const setGlobalMode = useMatrixStore((s) => s.setGlobalMode);
    const matrixState = useMatrixStore((s) => s.matrixState);

    const updateTextProp = (prop: Partial<TextProps>) => {
        updateTextConfig(prop);
        setGlobalMode('text');
    };

    const handleSendToMatrix = () => {
        console.log("Sende an Matrix:", matrixState);
    };

    return (
        <ThemedBackground>
            <View className="flex-1 justify-between p-5">
                <View className="gap-4">
                    <ThemedTextInput
                        label="Text"
                        value={textConfig.text}
                        onChangeText={(text) => updateTextProp({ text })}
                    />

                    <ColorSelector
                        onSelect={(color) => updateTextProp({ color })}
                        defaultColor={textConfig.color}
                    />

                    <ThemedSegmentedButtons
                        value={textConfig.align}
                        onValueChange={(align) => updateTextProp({ align })}
                        options={{
                            left: 'Links',
                            center: 'Mitte',
                            right: 'Rechts',
                        }}
                    />
                </View>

                <View className="pt-5">
                    <ThemedButton
                        mode="contained"
                        onPress={handleSendToMatrix}
                        title={"An die Matrix senden"}
                    />
                </View>
            </View>
        </ThemedBackground>
    );
}
