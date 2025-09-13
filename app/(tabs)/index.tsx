import ThemedBackground from "@/src/components/themed/ThemedBackground";
import {useAuth} from "@/src/context/AuthProvider";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import React, {useEffect, useState} from "react";
import Checkbox from 'expo-checkbox';
import {StyleSheet, View} from "react-native";
import {useTheme} from "@/src/context/ThemeProvider";
import ThemedParagraph from "@/src/components/themed/ThemedParagraph";

export default function HomeScreen() {
    const [idle, setIdle] = useState(false);
    const {authenticatedUser} = useAuth();
    const {theme} = useTheme();

    useEffect(() => {
        if (authenticatedUser) {
            setIdle(authenticatedUser.lastState?.global.mode === "idle")
        }
    }, [authenticatedUser]);

    return (
        <ThemedBackground>
            <ThemedHeader>Willkommen!</ThemedHeader>
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={idle}
                    onValueChange={setIdle}
                    color={idle ? theme.colors.tertiary : undefined}
                />
                <ThemedParagraph>Energiesparmodus</ThemedParagraph>
            </View>
        </ThemedBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 32,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
    },
});
