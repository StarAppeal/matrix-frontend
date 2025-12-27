import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ThemedTextInput from "@/src/components/themed/ThemedTextInput";
import ColorSelector from "@/src/components/themed/ColorSelector";
import {View, Text} from "react-native";
import ThemedSegmentedButtons from "@/src/components/themed/ThemedSegmentedButtons";
import { MatrixState } from '@/src/model/User';
import { useMatrixStore } from "@/src/stores";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import SaveToMatrixButton from "@/src/components/SaveToMatrixButton";

type TextProps = MatrixState['text'];

export default function TextScreen() {
    const textConfig = useMatrixStore((s) => s.matrixState.text);
    const updateTextConfig = useMatrixStore((s) => s.updateTextConfig);

    const updateTextProp = (prop: Partial<TextProps>) => {
        updateTextConfig(prop);
    };

    return (
        <ThemedBackground>
            <View className="flex-1 justify-between">
                <View className="gap-4">
                    <ThemedHeader subtitle="Zeige Text auf deiner Matrix an">
                        Text Modus
                    </ThemedHeader>

                    <View className="bg-surface dark:bg-surface-dark rounded-2xl p-5 gap-4">
                        <ThemedTextInput
                            label="Dein Text"
                            value={textConfig.text}
                            onChangeText={(text) => updateTextProp({ text })}
                            className="my-0"
                        />

                        <View>
                            <Text className="text-sm font-medium text-muted dark:text-muted-dark mb-2">
                                Textfarbe
                            </Text>
                            <ColorSelector
                                onSelect={(color) => updateTextProp({ color })}
                                defaultColor={textConfig.color}
                            />
                        </View>

                        <View>
                            <Text className="text-sm font-medium text-muted dark:text-muted-dark mb-2">
                                Ausrichtung
                            </Text>
                            <ThemedSegmentedButtons
                                value={textConfig.align}
                                onValueChange={(align) => updateTextProp({ align })}
                                options={{
                                    left: 'Links',
                                    center: 'Mitte',
                                    right: 'Rechts',
                                }}
                                className="my-0"
                            />
                        </View>
                    </View>
                </View>

                <SaveToMatrixButton mode="text" />
            </View>
        </ThemedBackground>
    );
}
