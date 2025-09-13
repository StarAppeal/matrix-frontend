import React from 'react';
import {useSpotifyAuth} from '@/src/hooks/useSpotifyAuth';
import {Token} from "@/src/services/RestService";
import ThemedButton from "@/src/components/themed/ThemedButton";

interface SpotifyAuthButtonProps {
    onAuthSuccess: (token: Token) => void;
    jwtToken: string | null;
    disabled: boolean;
}

const SpotifyAuthButton = ({onAuthSuccess, jwtToken, disabled}: SpotifyAuthButtonProps) => {
    const {promptAuth, isReady, error} = useSpotifyAuth(onAuthSuccess, jwtToken);

    if (error) {
        console.error('Spotify Auth Error:', error);
    }

    return (
        <ThemedButton
            onPress={promptAuth}
            mode={"outlined"}
            disabled={disabled}
       title={isReady ? 'Sign in with Spotify' : 'Loading...'} />
    );
};

export default SpotifyAuthButton;
