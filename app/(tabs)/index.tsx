import ThemedBackground from "@/src/components/themed/ThemedBackground";
import {useAuth} from "@/src/stores/authStore";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import React, {useEffect, useState} from "react";
import {View} from "react-native";
import ThemedCheckbox from "@/src/components/themed/ThemedCheckbox";
import ThemedParagraph from "@/src/components/themed/ThemedParagraph";

export default function HomeScreen() {
    const [idle, setIdle] = useState(false);
    const {authenticatedUser} = useAuth();

    useEffect(() => {
        if (authenticatedUser) {
            setIdle(authenticatedUser.lastState?.global.mode === "idle")
        }
    }, [authenticatedUser]);

    return (
        <ThemedBackground>
            <View className="flex-1">
                <ThemedHeader
                    subtitle="Steuere deine LED Matrix"
                >
                    Willkommen{authenticatedUser?.name ? `, ${authenticatedUser.name}` : ''}!
                </ThemedHeader>

                <View className="mt-6 gap-4">
                    <View className="bg-surface dark:bg-surface-dark rounded-2xl p-5">
                        <ThemedParagraph className="text-left mb-3 font-semibold text-lg">
                            Schnelleinstellungen
                        </ThemedParagraph>

                        <ThemedCheckbox
                            label="Energiesparmodus"
                            description="Reduziert Helligkeit und deaktiviert Animationen"
                            value={idle}
                            onValueChange={setIdle}
                        />
                    </View>
                </View>
            </View>
        </ThemedBackground>
    );
}
