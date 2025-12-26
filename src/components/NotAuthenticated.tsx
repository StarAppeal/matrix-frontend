import { Image } from "react-native";
import React from "react";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ThemedParagraph from "@/src/components/themed/ThemedParagraph";
import ThemedButton from "@/src/components/themed/ThemedButton";
import { useRouter } from "expo-router";

export default function NotAuthenticated() {
    const router = useRouter();
    return (
        <ThemedBackground>
            <Image
                source={require("@/assets/images/GarfieldCharakter.webp")}
                className="w-52 h-52 mb-3"
            />
            <ThemedParagraph>
                You are not authenticated. Please log in to view this content.
            </ThemedParagraph>
            <ThemedButton mode="outlined" onPress={() => router.push("/login")} title={"Login"} />
        </ThemedBackground>
    );
}
