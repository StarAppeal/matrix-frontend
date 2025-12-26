import ThemedHeader from "@/src/components/themed/ThemedHeader";
import React from "react";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ChangePasswordFeature from "@/src/components/ChangePasswordFeature";
import ThemeToggleButton from "@/src/components/ThemeToggleButton";
import SpotifyAuthButton from "@/src/components/SpotifyAuthButton";
import {RestService, Token} from "@/src/services/RestService";

import {useAuth} from "@/src/stores/authStore";
import {View} from "react-native";
import ThemedButton from "@/src/components/themed/ThemedButton";
import {useRouter} from "expo-router";

export default function SettingsScreen() {
    const {token: jwtToken, authenticatedUser, logout, refreshUser} = useAuth();
    const router = useRouter();

    const handleAuthSuccess = (token: Token) => {
        const spotifyConfig = {
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            scope: token.scope,
            expirationDate: new Date(Date.now() + token.expires_in * 1000),
        };

        new RestService(jwtToken).updateSelfSpotifyConfig(spotifyConfig).then((result) => {
            console.log("Spotify Token gespeichert");
            console.log(result);

            refreshUser();
        });
    };

    return (
        <ThemedBackground>
            <View className="w-full gap-3 items-center">
                <ThemedHeader>Einen wunderschönen guten Tag, {authenticatedUser?.name}</ThemedHeader>
                <ChangePasswordFeature/>
                <ThemeToggleButton/>
                    <SpotifyAuthButton
                        onAuthSuccess={handleAuthSuccess}
                        jwtToken={jwtToken}
                        disabled={!!authenticatedUser?.spotifyConfig}
                    />
                {!!authenticatedUser?.spotifyConfig && ( <ThemedButton mode={"outlined"} title={"Remove Spotify"} onPress={() => {
                    const rest = new RestService(jwtToken);
                    rest.removeSpotifyConfig().then((result) => {
                        console.log("Spotify Login entfernt");
                        console.log(result);
                        refreshUser()
                    })
                }}/>)}

            </View>
            <ThemedButton mode={"outlined"} title={"Logout"} onPress={() => {
                console.log("Button pressed");
                logout().then(() => {
                    router.replace("/login");
                });
            }
            }/>
        </ThemedBackground>
    );
}

