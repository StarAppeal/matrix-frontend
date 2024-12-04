import React from "react";

import ThemedBackground from "../../src/components/themed/ThemedBackground";
import Logo from "../../src/components/Logo";
import ThemedHeader from "../../src/components/themed/ThemedHeader";
import ThemedParagraph from "../../src/components/themed/ThemedParagraph";
import ThemedButton from "../../src/components/themed/ThemedButton";
import {useNavigation} from "@react-navigation/core";

import {useAuth} from "@/src/context/AuthProvider";

export default function HomeScreen() {
    console.log("HALLO LEUTE");
    const navigation = useNavigation<any>();
    const {token, logout} = useAuth();

    return (
        <ThemedBackground>
            <Logo/>
            <ThemedHeader>Welcome 💫</ThemedHeader>
            <ThemedParagraph>Congratulations you are logged in.</ThemedParagraph>
            <ThemedParagraph>{token}</ThemedParagraph>
            <ThemedButton
                mode="outlined"
                onPress={() => navigation.navigate("ProtectedScreen")}>
                OwO what's this?
            </ThemedButton>

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
