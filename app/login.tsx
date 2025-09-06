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
import PasswordInput from "@/src/components/PasswordInput";


export default function LoginScreen() {
    const {isAuthenticated, login, logout, error} = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log(isAuthenticated);

        if (isAuthenticated) {
            console.log("User ist eingeloggt, weiterleiten...");
            router.replace("/");
        }
    }, [isAuthenticated]);

    const onLoginPressed = async () => {
        console.log("Login wird ausgeführt...")
        await login(username, password);
    };

    if (isAuthenticated) {
        return (
            <ThemedBackground>
                <Logo/>
                <ThemedHeader>Du bist bereits eingeloggt. Was machst'n hier?</ThemedHeader>
                <ThemedButton mode="contained" onPress={logout} title={"Logout"} />
                <ThemedButton mode="outlined" onPress={() => router.push("/")} title={"Zurück"} />
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
                value={username}
                onChangeText={setUsername}
                error={!!error && error?.toLowerCase().includes("user") }
                errorText={error!}
                autoCapitalize="none"
            />

            <PasswordInput
                label="Password"
                returnKeyType="done"
                value={password}
                onChangeText={setPassword}
                error={!!error && error?.toLowerCase().includes("pass") }
                errorText={error!}
                autoComplete="password"
            />
            <ThemedButton mode="outlined" onPress={onLoginPressed} title={"Login"} />
           <ThemeToggleButton />
        </ThemedBackground>
    );
}
