import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from "react";
import SpotifyAuthButton from "@/components/SpotifyAuthButton";
import {Token} from "@/services/RestService";

export default function AboutScreen() {
    const [token, setToken] = useState<Token | null>(null);

    const handleAuthSuccess = (token: Token) => {
        setToken(token);
        console.log('Erhaltener Authentifizierungscode:', token);
        // Hier kannst du den Code weiterverwenden, um das Access Token zu erhalten
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>About screen</Text>
            <Text>Willkommen bei der Spotify Authentifizierung</Text>
            <SpotifyAuthButton onAuthSuccess={handleAuthSuccess}/>
            {token && <Text>Erhaltener Code: {token.access_token}</Text>}
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
});
