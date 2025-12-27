import ThemedHeader from "@/src/components/themed/ThemedHeader";
import React from "react";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ChangePasswordFeature from "@/src/components/ChangePasswordFeature";
import ThemeToggleButton from "@/src/components/ThemeToggleButton";
import SpotifyAuthButton from "@/src/components/SpotifyAuthButton";
import {restService, Token} from "@/src/services/RestService";

import {useAuth} from "@/src/stores/authStore";
import {View, Text} from "react-native";
import ThemedButton from "@/src/components/themed/ThemedButton";
import {useRouter} from "expo-router";

export default function SettingsScreen() {
    const {authenticatedUser, logout, refreshUser} = useAuth();
    const router = useRouter();

    const handleAuthSuccess = (token: Token) => {
        const spotifyConfig = {
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            scope: token.scope,
            expirationDate: new Date(Date.now() + token.expires_in * 1000),
        };

        restService.updateSelfSpotifyConfig(spotifyConfig).then((result) => {
            console.log("Spotify Token gespeichert");
            console.log(result);

            refreshUser();
        });
    };

    return (
        <ThemedBackground>
            <View className="flex-1 gap-6">
                <ThemedHeader subtitle="Verwalte dein Konto und App-Einstellungen">
                    Hallo, {authenticatedUser?.name}
                </ThemedHeader>

                <View className="bg-surface dark:bg-surface-dark rounded-2xl p-5">
                    <Text className="text-base font-semibold text-onSurface dark:text-onSurface-dark mb-4">
                        Erscheinungsbild
                    </Text>
                    <View className="flex-row items-center justify-between">
                        <Text className="text-sm text-muted dark:text-muted-dark">
                            Dark Mode
                        </Text>
                        <ThemeToggleButton />
                    </View>
                </View>

                <View className="bg-surface dark:bg-surface-dark rounded-2xl p-5">
                    <Text className="text-base font-semibold text-onSurface dark:text-onSurface-dark mb-4">
                        Konto
                    </Text>
                    <View className="gap-3">
                        <ChangePasswordFeature />
                    </View>
                </View>

                <View className="bg-surface dark:bg-surface-dark rounded-2xl p-5">
                    <Text className="text-base font-semibold text-onSurface dark:text-onSurface-dark mb-4">
                        Integrationen
                    </Text>
                    <View className="gap-3">
                        <SpotifyAuthButton
                            onAuthSuccess={handleAuthSuccess}
                            disabled={!!authenticatedUser?.spotifyConfig}
                        />
                        {!!authenticatedUser?.spotifyConfig && (
                            <ThemedButton
                                mode="outlined"
                                title="Spotify trennen"
                                onPress={() => {
                                    restService.removeSpotifyConfig().then((result) => {
                                        console.log("Spotify Login entfernt");
                                        console.log(result);
                                        refreshUser();
                                    });
                                }}
                            />
                        )}
                    </View>
                </View>

                <View className="mt-auto pb-4">
                    <ThemedButton
                        mode="outlined"
                        title="Abmelden"
                        onPress={() => {
                            console.log("Button pressed");
                            logout().then(() => {
                                router.replace("/login");
                            });
                        }}
                    />
                </View>
            </View>
        </ThemedBackground>
    );
}

