import React, {useEffect, useState} from "react";
import {View} from "react-native";

import ThemedBackground from "../src/components/themed/ThemedBackground";
import Logo from "../src/components/Logo";
import ThemedHeader from "../src/components/themed/ThemedHeader";
import ThemedButton from "../src/components/themed/ThemedButton";
import ThemedTextInput from "../src/components/themed/ThemedTextInput";

import {useAuth} from "@/src/stores/authStore";
import {useRouter} from "expo-router";
import ThemeToggleButton from "@/src/components/ThemeToggleButton";
import PasswordInput from "@/src/components/PasswordInput";
import ThemedCheckbox from "@/src/components/themed/ThemedCheckbox";

export default function LoginScreen() {
    const {isAuthenticated, login, logout, error} = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [stayLoggedIn, setStayLoggedIn] = useState(false);

    useEffect(() => {
        console.log(isAuthenticated);

        if (isAuthenticated) {
            console.log("User ist eingeloggt, weiterleiten...");
            router.replace("/");
        }
    }, [isAuthenticated]);

    const onLoginPressed = async () => {
        console.log("Login wird ausgeführt...")
        await login(username, password, stayLoggedIn);
    };

    if (isAuthenticated) {
        return (
            <ThemedBackground className="items-center justify-center">
                <Logo size="large" />
                <ThemedHeader centered>Du bist bereits eingeloggt. Was machst'n hier?</ThemedHeader>
                <View className="w-full gap-2 mt-4">
                    <ThemedButton mode="contained" onPress={logout} title={"Logout"} />
                    <ThemedButton mode="outlined" onPress={() => router.push("/")} title={"Zurück"} />
                </View>
            </ThemedBackground>
        )
    }

    return (
        <ThemedBackground>

            <View className="flex-1 justify-center">
                <View className="items-center mb-8">
                    <Logo size="large" />
                    <ThemedHeader centered subtitle="Melde dich an, um fortzufahren">
                        Willkommen zurück
                    </ThemedHeader>
                </View>

                <View className="bg-surface dark:bg-surface-dark rounded-2xl p-6 gap-2">
                    <ThemedTextInput
                        label="Username"
                        returnKeyType="next"
                        value={username}
                        onChangeText={setUsername}
                        error={!!error && error?.field === "username"}
                        errorText={error?.message}
                        autoCapitalize="none"
                    />

                    <PasswordInput
                        label="Password"
                        returnKeyType="done"
                        value={password}
                        onChangeText={setPassword}
                        error={!!error && error?.field === "password"}
                        errorText={error?.message}
                        autoComplete="password"
                    />

                    <ThemedCheckbox
                        label="Angemeldet bleiben"
                        description="Du wirst nicht automatisch ausgeloggt"
                        value={stayLoggedIn}
                        onValueChange={setStayLoggedIn}
                    />

                    <ThemedButton
                        mode="contained"
                        onPress={onLoginPressed}
                        title={"Anmelden"}
                        className="mt-4"
                    />
                </View>

                <View className="items-center mt-8">
                    <ThemeToggleButton />
                </View>
            </View>
        </ThemedBackground>
    );
}
