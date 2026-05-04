import React from "react";
import {View, Text, ScrollView} from "react-native";
import {useMatrixStore} from "@/src/stores";
import ColorSelector from "@/src/components/themed/ColorSelector";
import ThemedSegmentedButtons from "@/src/components/themed/ThemedSegmentedButtons";
import ModeScreenLayout from "@/src/components/ModeScreenLayout";

export default function GameOfLifeScreen() {
    const golConfig = useMatrixStore((s) => s.matrixState.game_of_life);
    const updateGolConfig = useMatrixStore((s) => s.updateGameOfLifeConfig);

    return (
        <ModeScreenLayout
            mode="game_of_life"
            title="Game of Life"
            subtitle="Conway's zellulärer Automat"
            icon="cpu"
            settingsTitle="Simulations-Einstellungen"
            settingsDescription="Beobachte, wie lebende Zellen wachsen und sterben."
        >
            <View>
                <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                    Zellengröße
                </Text>
                <ThemedSegmentedButtons
                    value={golConfig.cell_size.toString()}
                    onValueChange={(val) => updateGolConfig({cell_size: parseInt(val, 10)})}
                    options={{
                        '1': '1 Pixel',
                        '2': '2 Pixel',
                        '4': '4 Pixel',
                    }}
                    className="my-0"
                />
            </View>

            <View>
                <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                    Geschwindigkeit
                </Text>
                <ThemedSegmentedButtons
                    value={golConfig.speed.toString()}
                    onValueChange={(val) => updateGolConfig({speed: parseInt(val, 10)})}
                    options={{
                        '2': 'Langsam',
                        '10': 'Normal',
                        '30': 'Schnell',
                    }}
                    className="my-0"
                />
            </View>

            <View>
                <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                    Farbe der Zellen
                </Text>
                <ColorSelector
                    onSelect={(color) => updateGolConfig({color})}
                    defaultColor={golConfig.color}
                />
            </View>
        </ModeScreenLayout>
    );
}