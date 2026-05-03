import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import ThemedCheckbox from "@/src/components/themed/ThemedCheckbox";
import SaveToMatrixButton from "@/src/components/SaveToMatrixButton";
import { useMatrixStore } from "@/src/stores";
import { useAuth } from "@/src/stores/authStore";
import { useColors } from "@/src/hooks/useColors";

export default function MusicScreen() {
    const { colors } = useColors();
    const { authenticatedUser } = useAuth();
    const musicConfig = useMatrixStore((s) => s.matrixState.music);
    const updateMusicConfig = useMatrixStore((s) => s.updateMusicConfig);

    const hasLastFm = !!authenticatedUser?.lastFmUsername;

    return (
        <ThemedBackground>
            <View className="flex-1 justify-between">
                <View>
                    <ThemedHeader subtitle="Visualisiere deine Musik">
                        Musik Modus
                    </ThemedHeader>

                    <View className="bg-surface dark:bg-surface-dark rounded-2xl p-6 mt-4">
                        <View className="items-center mb-6">
                            <View className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-light/10 items-center justify-center mb-3">
                                <Feather name="music" size={32} color={colors.primary} />
                            </View>
                            <Text className="text-base font-medium text-onSurface dark:text-onSurface-dark">
                                Musik Visualisierung
                            </Text>
                            {/* NEU: Text auf Last.fm angepasst */}
                            {!hasLastFm && (
                                <Text className="text-sm text-red-500 dark:text-red-400 text-center mt-2">
                                    Verbinde Last.fm in den Einstellungen, um diesen Modus zu nutzen!
                                </Text>
                            )}
                        </View>

                        <ThemedCheckbox
                            label="Vollbild-Modus"
                            description="Zeigt das Album-Cover im Vollbild an"
                            value={musicConfig.fullscreen}
                            onValueChange={(fullscreen) => updateMusicConfig({ fullscreen })}
                        />
                    </View>
                </View>

                {/* Add disabled when no account configured */}
                <View>
                    <SaveToMatrixButton mode="music"  />
                </View>
            </View>
        </ThemedBackground>
    );
}