import React from 'react';
import {useSpotifyAuth} from '@/src/hooks/useSpotifyAuth';
import {Token} from "@/src/services/RestService";
import ThemedButton from "@/src/components/themed/ThemedButton";

interface SpotifyAuthButtonProps {
    onAuthSuccess: (token: Token) => void;
}

const SpotifyAuthButton = ({onAuthSuccess}: SpotifyAuthButtonProps) => {
    const {promptAuth, isReady, error} = useSpotifyAuth(onAuthSuccess);

    if (error) {
        console.error('Spotify Auth Error:', error);
    }

    return (
        <ThemedButton
            onPress={promptAuth}
            mode={"outlined"}>
            {isReady ? 'Sign in with Spotify' : 'Loading...'}
        </ThemedButton>
    );
};

export default SpotifyAuthButton;
