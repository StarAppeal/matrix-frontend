import {useEffect} from "react";
import {makeRedirectUri, useAuthRequest} from "expo-auth-session";
import {RestService, Token} from "@/src/services/RestService";

const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

interface UseSpotifyAuthResult {
    promptAuth: () => void;
    isReady: boolean;
    error: Error | null;
}

export const useSpotifyAuth = (
    onAuthSuccess: (token: Token) => void,
    jwtToken: string,
): UseSpotifyAuthResult => {
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!,
            scopes: ['user-read-currently-playing'],
            usePKCE: false,
            redirectUri: makeRedirectUri({
                scheme: 'led.matrix',
                path: 'callback',
            }),
        },
        discovery
    );

    useEffect(() => {
        const handleAuthResponse = async () => {
            if (response?.type === 'success') {
                try {
                    const {code} = response.params;
                    const token = (await new RestService(jwtToken).exchangeSpotifyCodeForToken(code));
                    console.log('Token:', token);
                    onAuthSuccess(token);
                } catch (error) {
                    console.error('Fehler bei der Authentifizierung:', error);
                }
            }
        };

        handleAuthResponse();
    }, [response]);

    return {
        promptAuth: () => promptAsync(),
        isReady: !!request,
        error: response?.type === 'error' ? new Error('Auth fehlgeschlagen') : null,
    };
};
