import React from "react";
import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import {Feather} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ThemedHeader from "@/src/components/themed/ThemedHeader";

const AVAILABLE_MODES = [
    {
        id: "text",
        title: "Lauftext",
        description: "Texte auf der Matrix anzeigen",
        icon: "type",
        path: "/modes/text",
        color: "bg-blue-500"
    },
    {
        id: "image",
        title: "Bilder & GIFs",
        description: "Pixel-Art hochladen",
        icon: "image",
        path: "/modes/image",
        color: "bg-green-500"
    },
    {
        id: "music",
        title: "Musik",
        description: "Spotify / Last.fm Visualisierung",
        icon: "music",
        path: "/modes/music",
        color: "bg-purple-500"
    },
    {
        id: "clock",
        title: "Uhr & Wetter",
        description: "Digitale Uhr mit Wetterdaten",
        icon: "clock",
        path: "/modes/clock",
        color: "bg-orange-500"
    },
    {
        id: "gol",
        title: "Game of Life",
        description: "Zellulärer Automat",
        icon: "cpu",
        path: "/modes/game_of_life",
        color: "bg-teal-500"
    },
    {
        id: "pet",
        title: "Eigener Tamagotchi",
        description: "Lass ihn nicht verhungern!",
        icon: "github",
        path: "/modes/tamagotchi",
        color: "bg-fuchsia-500"
    },
];

export default function ModesDashboardScreen() {
    const router = useRouter();

    return (
        <ThemedBackground>
            <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{paddingBottom: 40}}>
                <ThemedHeader subtitle="Klicke auf einen Modus, um ihn zu bearbeiten">
                    Verfügbare Modi
                </ThemedHeader>

                <View className="mt-6">
                    {AVAILABLE_MODES.map((mode) => (
                        <TouchableOpacity
                            key={mode.id}
                            onPress={() => router.push(mode.path as any)}
                            className="flex-row items-center bg-surface dark:bg-surface-dark rounded-2xl p-4 mb-3 shadow-sm border border-outline/10"
                        >
                            <View className={`w-12 h-12 rounded-full ${mode.color} items-center justify-center mr-4`}>
                                <Feather name={mode.icon as any} size={24} color="white"/>
                            </View>

                            <View className="flex-1">
                                <Text className="text-onSurface dark:text-onSurface-dark font-bold text-base mb-1">
                                    {mode.title}
                                </Text>
                                <Text className="text-muted dark:text-muted-dark text-xs">
                                    {mode.description}
                                </Text>
                            </View>

                            <Feather name="chevron-right" size={24} color="#888"/>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </ThemedBackground>
    );
}