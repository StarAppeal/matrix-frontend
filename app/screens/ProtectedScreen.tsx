import React from "react";
import {useAuth} from "@/src/context/AuthProvider";
import Logo from "@/src/components/Logo";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import ThemedParagraph from "@/src/components/themed/ThemedParagraph";
import ThemedButton from "../../src/components/themed/ThemedButton";
import {useNavigation} from "@react-navigation/core";
import ThemedBackground from "@/src/components/themed/ThemedBackground";

export default function ProtectedScreen(): JSX.Element {
    const navigation = useNavigation<any>();
    const {token, logout} = useAuth();

    return (
        <ThemedBackground>
            <Logo/>
            <ThemedHeader>Welcome 💫</ThemedHeader>
            <ThemedParagraph>Dies ist geheim. PSST !</ThemedParagraph>
            <ThemedParagraph>{token}</ThemedParagraph>
            <ThemedButton
                mode="outlined"
                onPress={async () => {
                    await logout();
                    navigation.reset({
                        index: 0,
                        routes: [{name: "LoginScreen"}],
                    })
                }
                }
            >
                Sign out
            </ThemedButton>
        </ThemedBackground>
    );
}
