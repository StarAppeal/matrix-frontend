import React, {  useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "@/src/stores/authStore";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import ThemedCheckbox from "@/src/components/themed/ThemedCheckbox";
import { useMatrixStore } from "@/src/stores";
import { restService } from "@/src/services/RestService";

export default function HomeScreen() {
    const { authenticatedUser } = useAuth();
    const globalMode = useMatrixStore(s => s.matrixState.global.mode);
    const setGlobalMode = useMatrixStore(s => s.setGlobalMode);

    const [isSaving, setIsSaving] = useState(false);

    const handleIdleToggle = async (val: boolean) => {
        setIsSaving(true);
        const newMode = val ? "idle" : "text";

        try {
            setGlobalMode(newMode);

            await new Promise(r => setTimeout(r, 50));
            const updatedState = useMatrixStore.getState().matrixState;
            await restService.updateLastState(updatedState);
        } catch (e) {
            console.error("Error while toggling idle", e);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <ThemedBackground>
            <View className="flex-1 px-4 pt-4">
                <ThemedHeader subtitle="Zentrale Steuerung">
                    Willkommen{authenticatedUser?.name ? `, ${authenticatedUser.name}` : ''}!
                </ThemedHeader>

                <View className="bg-surface dark:bg-surface-dark rounded-2xl p-5 mt-6 border border-outline/10">
                    <Text className="text-left mb-3 font-bold text-base text-onSurface dark:text-onSurface-dark">
                        Schnelleinstellungen
                    </Text>
                    <ThemedCheckbox
                        label={isSaving ? "Speichere..." : "Energiesparmodus"}
                        description="Schaltet die Matrix sofort schwarz"
                        value={globalMode === "idle"}
                        onValueChange={handleIdleToggle}
                    />
                </View>

            </View>
        </ThemedBackground>
    );
}