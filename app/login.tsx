import React, {useEffect, useState} from "react";


import ThemedBackground from "../src/components/themed/ThemedBackground";
import Logo from "../src/components/Logo";
import ThemedHeader from "../src/components/themed/ThemedHeader";
import ThemedButton from "../src/components/themed/ThemedButton";
import ThemedTextInput from "../src/components/themed/ThemedTextInput";
import BackButton from "../src/components/BackButton";

import {useAuth} from "@/src/context/AuthProvider";
import {useRouter} from "expo-router";
import ThemeToggleButton from "@/src/components/ThemeToggleButton";


export default function LoginScreen() {
    const {isAuthenticated, login, logout, error} = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState({value: ""});
    const [password, setPassword] = useState({value: ""});

    useEffect(() => {
        console.log(isAuthenticated);

        if (isAuthenticated) {
            console.log("User ist eingeloggt, weiterleiten...");
            router.replace("/");
        }
    }, [isAuthenticated]);

    const onLoginPressed = async () => {
        console.log("Login wird ausgeführt...")
        await login(username.value, password.value);
    };

    if (isAuthenticated) {
        return (
            <ThemedBackground>
                <Logo/>
                <ThemedHeader>Du bist bereits eingeloggt. Was machst'n hier?</ThemedHeader>
                <ThemedButton mode="contained" onPress={logout}>
                    Logout
                </ThemedButton>
                <ThemedButton mode="outlined" onPress={() => router.push("/")}>
                    Zurück
                </ThemedButton>
            </ThemedBackground>
        )
    }

    return (
        <ThemedBackground>
            <BackButton goBack={router.back}/>
            <Logo/>
            <ThemedHeader>Hello.</ThemedHeader>
            <ThemedTextInput
                label="Username"
                returnKeyType="next"
                value={username.value}
                onChangeText={(text: string) => setUsername({value: text})}
                error={!!error && error?.id === "username"}
                errorText={error?.message}
                autoCapitalize="none"
            />
            <ThemedTextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text: string) => setPassword({value: text})}
                error={!!error && error?.id === "password"}
                errorText={error?.message}
                secureTextEntry
            />
            <ThemedButton mode="outlined" onPress={onLoginPressed}>
                Log in
            </ThemedButton>
           <ThemeToggleButton />
        </ThemedBackground>
    );
}
