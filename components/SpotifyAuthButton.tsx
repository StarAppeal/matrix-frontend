import React from 'react';
import {Button} from 'react-native';
import {useSpotifyAuth} from '@/hooks/useSpotifyAuth';
import {Token} from "@/services/RestService";

interface SpotifyAuthButtonProps {
    onAuthSuccess: (token: Token) => void;
}

const SpotifyAuthButton = ({onAuthSuccess}: SpotifyAuthButtonProps) => {
    const {promptAuth, isReady, error} = useSpotifyAuth(onAuthSuccess);

    if (error) {
        console.error('Spotify Auth Error:', error);
    }

    return (
        <Button
            disabled={!isReady}
            title={'Login mit Spotify'}
            onPress={promptAuth}
        />
    );
};

export default SpotifyAuthButton;
