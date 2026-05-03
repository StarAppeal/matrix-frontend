import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ThemedTextInput from "@/src/components/themed/ThemedTextInput";
import ColorSelector from "@/src/components/themed/ColorSelector";
import { View, Text, ScrollView } from "react-native";
import { MatrixState } from '@/src/model/User';
import { useMatrixStore } from "@/src/stores";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import SaveToMatrixButton from "@/src/components/SaveToMatrixButton";
import MatrixPreview from "@/src/components/MatrixPreview";
import ThemedSegmentedButtons from "@/src/components/themed/ThemedSegmentedButtons";

type TextProps = MatrixState['text'];

export default function TextScreen() {
    const textConfig = useMatrixStore((s) => s.matrixState.text);
    const updateTextConfig = useMatrixStore((s) => s.updateTextConfig);

    const updateTextProp = (prop: Partial<TextProps>) => {
        updateTextConfig(prop);
    };

    return (
        <ThemedBackground>
            <View className="flex-1">
                <ThemedHeader subtitle="Zeige Text auf deiner Matrix an">
                    Text Modus
                </ThemedHeader>

                <ScrollView
                    className="flex-1 px-4"
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <MatrixPreview mode="text" />

                    <View className="bg-surface dark:bg-surface-dark rounded-2xl p-5 gap-6 mt-4 shadow-sm border border-outline/10">
                        <ThemedTextInput
                            label="Dein Text"
                            value={textConfig.text}
                            onChangeText={(text) => updateTextProp({ text })}
                            className="my-0"
                        />

                        <View>
                            <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                                Schriftgröße
                            </Text>
                            <ThemedSegmentedButtons
                                value={textConfig.size.toString()}
                                onValueChange={(val) => updateTextProp({ size: parseInt(val, 10) })}
                                options={{
                                    '1': 'Klein',
                                    '2': 'Mittel',
                                    '3': 'Groß',
                                }}
                                className="my-0"
                            />
                        </View>

                        <View>
                            <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                                Geschwindigkeit
                            </Text>
                            <ThemedSegmentedButtons
                                value={textConfig.speed.toString()}
                                onValueChange={(val) => updateTextProp({ speed: parseInt(val, 10) })}
                                options={{
                                    '3': 'Langsam',
                                    '5': 'Normal',
                                    '10': 'Schnell',
                                }}
                                className="my-0"
                            />
                        </View>

                        <View>
                            <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                                Ausrichtung
                            </Text>
                            <ThemedSegmentedButtons
                                value={textConfig.align}
                                onValueChange={(align) => updateTextProp({ align: align as 'left' | 'center' | 'right' })}
                                options={{
                                    left: 'Links',
                                    center: 'Mitte',
                                    right: 'Rechts',
                                }}
                                className="my-0"
                            />
                        </View>

                        <View>
                            <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                                Textfarbe
                            </Text>
                            <ColorSelector
                                onSelect={(color) => updateTextProp({ color })}
                                defaultColor={textConfig.color}
                            />
                        </View>
                    </View>
                </ScrollView>

                <View className="absolute bottom-4 left-4 right-4">
                    <SaveToMatrixButton mode="text" />
                </View>
            </View>
        </ThemedBackground>
    );
}