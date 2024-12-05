import React from "react";

import {useRouter} from "expo-router";

import ThemedBackground from "../src/components/themed/ThemedBackground";
import Logo from "../src/components/Logo";
import ThemedHeader from "../src/components/themed/ThemedHeader";
import ThemedParagraph from "../src/components/themed/ThemedParagraph";
import ThemedButton from "../src/components/themed/ThemedButton";

import {useAuth} from "@/src/context/AuthProvider";
import AuthenticatedWrapper from "@/src/components/AuthenticatedWrapper";

export default function HomeScreen() {
    const router = useRouter();
    const {token, logout} = useAuth();

    return (
        <AuthenticatedWrapper>
            <ThemedBackground>
                <Logo/>
                <ThemedHeader>Welcome 💫</ThemedHeader>
                <ThemedParagraph>Congratulations you are logged in.</ThemedParagraph>
                <ThemedParagraph>{token}</ThemedParagraph>
                <ThemedButton
                    mode="outlined"
                    onPress={() => router.push("/protected")}>
                    OwO what's this?
                </ThemedButton>

                <ThemedButton
                    mode="outlined"
                    onPress={async () => {
                        await logout();
                        router.replace("/login");
                    }
                    }
                >
                    Sign out
                </ThemedButton>
            </ThemedBackground>
        </AuthenticatedWrapper>
    );
}
