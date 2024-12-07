import ThemedHeader from "@/src/components/themed/ThemedHeader";
import React, {useState} from "react";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ChangePasswordModal from "@/src/components/ChangePasswordModal";
import ThemeToggleButton from "@/src/components/ThemeToggleButton";
import SpotifyAuthButton from "@/src/components/SpotifyAuthButton";
import {Token} from "@/src/services/RestService";
import {Text} from 'react-native-paper';

import * as WebBrowser from "expo-web-browser";
import {useAuth} from "@/src/context/AuthProvider";

WebBrowser.maybeCompleteAuthSession();

export default function SettingsScreen() {
    const {token: jwtToken} = useAuth();
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
            <ChangePasswordModal/>
            <ThemeToggleButton/>
            <SpotifyAuthButton onAuthSuccess={handleAuthSuccess} jwtToken={jwtToken!}/>
            {token && <Text>Erhaltener Code: {token.access_token}</Text>}
        </ThemedBackground>
    );
}
