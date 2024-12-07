import ThemedHeader from "@/src/components/themed/ThemedHeader";
import React, {useState} from "react";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ChangePasswordModal from "@/src/components/ChangePasswordModal";
import ThemeToggleButton from "@/src/components/ThemeToggleButton";
import SpotifyAuthButton from "@/src/components/SpotifyAuthButton";
import {Token} from "@/src/services/RestService";
import {Paragraph, Text} from 'react-native-paper';

import * as WebBrowser from "expo-web-browser";
import {useAuth} from "@/src/context/AuthProvider";
import {StyleSheet, View} from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function SettingsScreen() {
    const {token: jwtToken, authenticatedUser} = useAuth();
    const [token, setToken] = useState<Token | null>(null);

    const handleAuthSuccess = (token: Token) => {
        setToken(token);
        console.log('Erhaltener Authentifizierungscode:', token);
    };

    return (
        <ThemedBackground>
            <ThemedHeader>
                Settings
            </ThemedHeader>
            <View style={styles.container}>
                <Paragraph>Guten Tag, {authenticatedUser?.name}</Paragraph>
                <ChangePasswordModal/>
                <ThemeToggleButton/>
                <SpotifyAuthButton
                    onAuthSuccess={handleAuthSuccess}
                    jwtToken={jwtToken!}
                />
                {token && <Text>Erhaltener Code: {token.access_token}</Text>}
            </View>
        </ThemedBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 12, // Für Abstand zwischen den Kind-Elementen (ab React Native 0.71)
        alignItems: "center", // Zentrierung
    },
});
