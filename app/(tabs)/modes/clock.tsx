import React from "react";
import {View, Text} from "react-native";
import {Feather} from "@expo/vector-icons";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ColorSelector from "@/src/components/themed/ColorSelector";
import SaveToMatrixButton from "@/src/components/SaveToMatrixButton";
import { useMatrixStore } from "@/src/stores";
import {useColors} from "@/src/hooks/useColors";

export default function ClockScreen() {
    const {colors} = useColors();
    const clockConfig = useMatrixStore((s) => s.matrixState.clock);
    const updateClockConfig = useMatrixStore((s) => s.updateClockConfig);

    return (
        <ThemedBackground>
            <View className="flex-1 justify-between">
                <View>
                    <ThemedHeader subtitle="Zeige die Uhrzeit an">
                        Uhr Modus
                    </ThemedHeader>

                    <View className="bg-surface dark:bg-surface-dark rounded-2xl p-6 mt-4">
                        <View className="items-center mb-6">
                            <View className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-light/10 items-center justify-center mb-3">
                                <Feather name="clock" size={32} color={colors.primary} />
                            </View>
                            <Text className="text-base font-medium text-onSurface dark:text-onSurface-dark">
                                Uhr Anzeige
                            </Text>
                        </View>

                        <View>
                            <Text className="text-sm font-medium text-muted dark:text-muted-dark mb-2">
                                Uhrzeitfarbe
                            </Text>
                            <ColorSelector
                                onSelect={(color) => updateClockConfig({ color })}
                                defaultColor={clockConfig.color}
                            />
                        </View>
                    </View>
                </View>

                <SaveToMatrixButton mode="clock" />
            </View>
        </ThemedBackground>
    );
}
