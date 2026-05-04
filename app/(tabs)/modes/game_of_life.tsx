import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useMatrixStore } from "@/src/stores";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import ColorSelector from "@/src/components/themed/ColorSelector";
import SaveToMatrixButton from "@/src/components/SaveToMatrixButton";
import MatrixPreview from "@/src/components/MatrixPreview";
import ThemedSegmentedButtons from "@/src/components/themed/ThemedSegmentedButtons";

export default function GameOfLifeScreen() {
    const golConfig = useMatrixStore((s) => s.matrixState.game_of_life);
    const updateGolConfig = useMatrixStore((s) => s.updateGameOfLifeConfig);

    return (
        <ThemedBackground>
            <View className="flex-1">
                <ThemedHeader subtitle="Conway's zellulärer Automat">
                    Game of Life
                </ThemedHeader>

                <ScrollView
                    className="flex-1 px-4"
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <MatrixPreview mode="game_of_life" />

                    <View className="bg-surface dark:bg-surface-dark rounded-2xl p-6 mt-4 shadow-sm border border-outline/10 gap-6">
                        <View className="items-center mb-2">
                            <View className="w-16 h-16 rounded-full bg-teal-500/10 items-center justify-center mb-3">
                                <Feather name="cpu" size={32} color="#14b8a6" />
                            </View>
                            <Text className="text-base font-medium text-onSurface dark:text-onSurface-dark text-center">
                                Simulations-Einstellungen
                            </Text>
                            <Text className="text-xs text-muted dark:text-muted-dark text-center mt-1">
                                Beobachte, wie lebende Zellen wachsen und sterben.
                            </Text>
                        </View>

                        <View>
                            <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                                Zellengröße
                            </Text>
                            <ThemedSegmentedButtons
                                value={golConfig.cell_size.toString()}
                                onValueChange={(val) => updateGolConfig({ cell_size: parseInt(val, 10) })}
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
                                onValueChange={(val) => updateGolConfig({ speed: parseInt(val, 10) })}
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
                                onSelect={(color) => updateGolConfig({ color })}
                                defaultColor={golConfig.color}
                            />
                        </View>
                    </View>
                </ScrollView>

                <View className="absolute bottom-4 left-4 right-4 bg-background dark:bg-background-dark pt-2">
                    <SaveToMatrixButton mode="game_of_life" />
                </View>
            </View>
        </ThemedBackground>
    );
}