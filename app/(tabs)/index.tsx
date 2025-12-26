import ThemedBackground from "@/src/components/themed/ThemedBackground";
import {useAuth} from "@/src/stores/authStore";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import React, {useEffect, useState} from "react";
import Checkbox from 'expo-checkbox';
import {View} from "react-native";
import {useColors} from "@/src/hooks/useColors";
import ThemedParagraph from "@/src/components/themed/ThemedParagraph";

export default function HomeScreen() {
    const [idle, setIdle] = useState(false);
    const {authenticatedUser} = useAuth();
    const {colors} = useColors();

    useEffect(() => {
        if (authenticatedUser) {
            setIdle(authenticatedUser.lastState?.global.mode === "idle")
        }
    }, [authenticatedUser]);

    return (
        <ThemedBackground>
            <ThemedHeader>Willkommen!</ThemedHeader>
            <View className="flex-row items-center">
                <Checkbox
                    className="m-2"
                    value={idle}
                    onValueChange={setIdle}
                    color={idle ? colors.secondary : undefined}
                />
                <ThemedParagraph>Energiesparmodus</ThemedParagraph>
            </View>
        </ThemedBackground>
    );
}
