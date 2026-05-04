import ThemedTextInput from "@/src/components/themed/ThemedTextInput";
import ColorSelector from "@/src/components/themed/ColorSelector";
import {View, Text} from "react-native";
import {MatrixState} from '@/src/model/User';
import {useMatrixStore} from "@/src/stores";
import ThemedSegmentedButtons from "@/src/components/themed/ThemedSegmentedButtons";
import ModeScreenLayout from "@/src/components/ModeScreenLayout";

type TextProps = MatrixState['text'];

export default function TextScreen() {
    const textConfig = useMatrixStore((s) => s.matrixState.text);
    const updateTextConfig = useMatrixStore((s) => s.updateTextConfig);

    const updateTextProp = (prop: Partial<TextProps>) => {
        updateTextConfig(prop);
    };

    return (
        <ModeScreenLayout
            mode="text"
            title="Text Modus"
            subtitle="Zeige Text auf deiner Matrix an"
            icon="type"
            settingsTitle="Text-Anzeige"
            settingsDescription="Passe Text, Farbe und Geschwindigkeit für die Matrix an."
        >
            <ThemedTextInput
                label="Dein Text"
                value={textConfig.text}
                onChangeText={(text) => updateTextProp({text})}
                className="my-0"
            />

            <View>
                <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                    Schriftgröße
                </Text>
                <ThemedSegmentedButtons
                    value={textConfig.size.toString()}
                    onValueChange={(val) => updateTextProp({size: parseInt(val, 10)})}
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
                    onValueChange={(val) => updateTextProp({speed: parseInt(val, 10)})}
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
                    onValueChange={(align) => updateTextProp({align: align as 'left' | 'center' | 'right'})}
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
                    onSelect={(color) => updateTextProp({color})}
                    defaultColor={textConfig.color}
                />
            </View>
        </ModeScreenLayout>
    );
}