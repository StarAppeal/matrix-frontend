import React from "react";
import {useAuth} from "@/src/context/AuthProvider";
import Logo from "@/src/components/Logo";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import ThemedParagraph from "@/src/components/themed/ThemedParagraph";
import ThemedButton from "../../src/components/themed/ThemedButton";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import {useRouter} from "expo-router";
import AuthenticatedWrapper from "@/src/components/AuthenticatedWrapper";

export default function ProtectedScreen(): JSX.Element {
    const router = useRouter();
    const {token, logout} = useAuth();

    return (
        <AuthenticatedWrapper>
            <ThemedBackground>
                <Logo/>
                <ThemedHeader>Welcome 💫</ThemedHeader>
                <ThemedParagraph>Dies ist geheim. PSST !</ThemedParagraph>
                <ThemedParagraph>{token}</ThemedParagraph>
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
