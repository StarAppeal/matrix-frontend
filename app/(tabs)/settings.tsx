import ThemedHeader from "@/src/components/themed/ThemedHeader";
import React, {useState} from "react";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ChangePasswordFeature from "@/src/components/ChangePasswordFeature";
import ThemeToggleButton from "@/src/components/ThemeToggleButton";
import SpotifyAuthButton from "@/src/components/SpotifyAuthButton";
import {restService, Token, LocationResult} from "@/src/services/RestService";
import CustomModal from "@/src/components/themed/CustomModal";
import {useAuth} from "@/src/stores/authStore";
import {View, Text, TextInput, Pressable, ScrollView} from "react-native";
import ThemedButton from "@/src/components/themed/ThemedButton";
import {useRouter} from "expo-router";

export default function SettingsScreen() {
    const {authenticatedUser, logout, refreshUser} = useAuth();
    const router = useRouter();

    const [locationQuery, setLocationQuery] = useState("");
    const [locationResults, setLocationResults] = useState<LocationResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
    const [hoveredLocation, setHoveredLocation] = useState<LocationResult | null>(null);

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

    const searchLocation = async () => {
        if (!locationQuery.trim()) return;
        setIsSearching(true);
        try {
            const res = await restService.searchLocations(locationQuery.trim());
            if (res.ok) {
                setLocationResults(res.data.locations || []);
            }
        } catch (e) {
            console.error("Location search failed", e);
        } finally {
            setIsSearching(false);
        }
    };

    const applyLocation = async (loc: LocationResult) => {
        try {
            await restService.updateSelfLocation({ name: loc.name, lat: loc.lat, lon: loc.lon });
            await refreshUser();
            closeAndResetModal();
        } catch (e) {
            console.error("Location update failed", e);
        }
    };

    const closeAndResetModal = () => {
        setIsLocationModalVisible(false);
        setLocationResults([]);
        setHoveredLocation(null);
        setLocationQuery("");
    };

    return (
        <ThemedBackground>
            <View className="flex-1 gap-6">
                <ThemedHeader subtitle="Verwalte dein Konto und App-Einstellungen">
                    Hallo, {authenticatedUser?.name}
                </ThemedHeader>

                <View className="bg-surface dark:bg-surface-dark rounded-2xl p-5">
                    <View className="flex-row items-center justify-between">
                        <View>
                            <Text className="text-base font-semibold text-onSurface dark:text-onSurface-dark mb-1">
                                Standort
                            </Text>
                            <Text className="text-sm text-muted dark:text-muted-dark">
                                Aktueller Standort: {authenticatedUser?.location?.name ?? "nicht gesetzt"}
                            </Text>
                        </View>
                        <Pressable
                            onPress={() => setIsLocationModalVisible(true)}
                            className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/30"
                        >
                            <Text className="text-primary font-semibold">✏️ Bearbeiten</Text>
                        </Pressable>
                    </View>
                </View>

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

                <CustomModal
                    isVisible={isLocationModalVisible}
                    onClose={closeAndResetModal}
                    className="bg-surface dark:bg-surface-dark max-w-md w-full self-center"
                >
                    <View>
                        <View className="flex-row items-center justify-between mb-3">
                            <Text className="text-lg font-semibold text-onSurface dark:text-onSurface-dark">
                                Standort wählen
                            </Text>
                            <Pressable onPress={closeAndResetModal}>
                                <Text className="text-primary font-semibold">Schließen</Text>
                            </Pressable>
                        </View>

                        <TextInput
                            className="bg-background dark:bg-background-dark text-onSurface dark:text-onSurface-dark rounded-lg px-3 py-2 mb-3"
                            placeholder="Stadt suchen"
                            placeholderTextColor="#888"
                            value={locationQuery}
                            onChangeText={setLocationQuery}
                            onSubmitEditing={searchLocation}
                            returnKeyType="search"
                        />
                        <ThemedButton
                            mode="contained"
                            title={isSearching ? "Suche..." : "Standort suchen"}
                            onPress={searchLocation}
                            disabled={isSearching}
                        />

                        <ScrollView className="mt-4 max-h-64">
                            {locationResults.map((loc, idx) => (
                                <Pressable
                                    key={`${loc.name}-${idx}`}
                                    onPress={() => applyLocation(loc)}
                                    onHoverIn={() => setHoveredLocation(loc)}
                                    onHoverOut={() => setHoveredLocation(null)}
                                    className="border border-outline dark:border-outline-dark rounded-lg p-3 mb-2"
                                >
                                    <Text className="text-onSurface dark:text-onSurface-dark font-semibold">
                                        {loc.name}
                                    </Text>
                                    <Text className="text-xs text-muted dark:text-muted-dark">
                                        {loc.country ?? "Unbekannt"}{loc.state ? `, ${loc.state}` : ""}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>

                        {locationResults.length > 0 && (
                            <View className="mt-3 p-3 rounded-lg bg-background dark:bg-background-dark border border-outline/60 dark:border-outline-dark/60">
                                <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-1">
                                    Details
                                </Text>
                                <Text className="text-xs text-muted dark:text-muted-dark">
                                    {hoveredLocation?.name ?? "—"}
                                </Text>
                                <Text className="text-xs text-muted dark:text-muted-dark">
                                    {hoveredLocation
                                        ? `${hoveredLocation.country ?? "Land unbekannt"}${hoveredLocation.state ? `, ${hoveredLocation.state}` : ""}`
                                        : "—"
                                    }
                                </Text>
                                <Text className="text-xs text-muted dark:text-muted-dark">
                                    {hoveredLocation
                                        ? `Koordinaten: ${hoveredLocation.lat.toFixed(4)}, ${hoveredLocation.lon.toFixed(4)}`
                                        : "Fahre mit der Maus über einen Standort"
                                    }
                                </Text>
                            </View>
                        )}
                    </View>
                </CustomModal>
            </View>
        </ThemedBackground>
    );
}
