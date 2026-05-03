import React from "react";
import {View, Text, ScrollView} from "react-native";
import {Feather} from "@expo/vector-icons";
import {useMatrixStore} from "@/src/stores";
import {useAuth} from "@/src/stores/authStore";
import {useColors} from "@/src/hooks/useColors";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import ThemedCheckbox from "@/src/components/themed/ThemedCheckbox";
import SaveToMatrixButton from "@/src/components/SaveToMatrixButton";
import MatrixPreview, {AdditionalInitialPayload} from "@/src/components/MatrixPreview";

const mockMusicData: AdditionalInitialPayload[] = [
    {
        "type": "MUSIC_UPDATE",
        "payload": {
            "isPlaying": true,
            "title": "Never Gonna Give You Up",
            "artist": "Rick Astley",
            "imageUrl": "https://lastfm.freetls.fastly.net/i/u/300x300/7eedf5854f216eba1908447afdb746d6.jpg"
        }
    }
];

export default function MusicScreen() {
    const {colors} = useColors();
    const {authenticatedUser} = useAuth();
    const musicConfig = useMatrixStore((s) => s.matrixState.music);
    const updateMusicConfig = useMatrixStore((s) => s.updateMusicConfig);

    const hasLastFm = !!authenticatedUser?.lastFmUsername;

    return (
        <ThemedBackground>
            <View className="flex-1">
                <ThemedHeader subtitle="Visualisiere deine Musik">
                    Musik Modus
                </ThemedHeader>

                <ScrollView
                    className="flex-1 px-4"
                    contentContainerStyle={{paddingBottom: 100}}
                    showsVerticalScrollIndicator={false}
                >
                    <MatrixPreview mode="music" additionalPayload={mockMusicData}/>

                    <View
                        className="bg-surface dark:bg-surface-dark rounded-2xl p-6 mt-4 shadow-sm border border-outline/10">
                        <View className="items-center mb-6">
                            <View
                                className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-light/10 items-center justify-center mb-3">
                                <Feather name="music" size={32} color={colors.primary}/>
                            </View>
                            <Text className="text-base font-medium text-onSurface dark:text-onSurface-dark">
                                Musik Visualisierung
                            </Text>
                            {!hasLastFm && (
                                <Text className="text-sm text-error dark:text-error-dark text-center mt-2">
                                    Verbinde Last.fm in den Einstellungen, um diesen Modus zu nutzen!
                                </Text>
                            )}
                        </View>

                        <ThemedCheckbox
                            label="Vollbild-Modus"
                            description="Zeigt das Album-Cover im Vollbild an"
                            value={musicConfig.fullscreen}
                            onValueChange={(fullscreen) => updateMusicConfig({fullscreen})}
                        />
                    </View>
                </ScrollView>

                <View className="absolute bottom-4 left-4 right-4">
                    <SaveToMatrixButton mode="music" disabled={!hasLastFm}/>
                </View>
            </View>
        </ThemedBackground>
    );
}