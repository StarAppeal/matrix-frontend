import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ColorSelector from "@/src/components/themed/ColorSelector";
import SaveToMatrixButton from "@/src/components/SaveToMatrixButton";
import MatrixPreview from "@/src/components/MatrixPreview";
import { useMatrixStore } from "@/src/stores";
import { useColors } from "@/src/hooks/useColors";

export default function ClockScreen() {
    const { colors } = useColors();
    const clockConfig = useMatrixStore((s) => s.matrixState.clock);
    const updateClockConfig = useMatrixStore((s) => s.updateClockConfig);

    return (
        <ThemedBackground>
            <View className="flex-1">
                <ThemedHeader subtitle="Zeige die Uhrzeit an">
                    Uhr Modus
                </ThemedHeader>

                <ScrollView
                    className="flex-1 px-4"
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <MatrixPreview mode="clock" />

                    <View className="bg-surface dark:bg-surface-dark rounded-2xl p-6 mt-4 shadow-sm border border-outline/10">
                        <View className="items-center mb-6">
                            <View className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-light/10 items-center justify-center mb-3">
                                <Feather name="clock" size={32} color={colors.primary} />
                            </View>
                            <Text className="text-base font-medium text-onSurface dark:text-onSurface-dark">
                                Uhr Anzeige
                            </Text>
                        </View>

                        <View>
                            <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                                Uhrzeitfarbe
                            </Text>
                            <ColorSelector
                                onSelect={(color) => updateClockConfig({ color })}
                                defaultColor={clockConfig.color}
                            />
                        </View>
                    </View>
                </ScrollView>

                <View className="absolute bottom-4 left-4 right-4">
                    <SaveToMatrixButton mode="clock" />
                </View>
            </View>
        </ThemedBackground>
    );
}