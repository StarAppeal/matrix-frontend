import {Image} from "react-native";
import React from "react";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ThemedParagraph from "@/src/components/themed/ThemedParagraph";
import {useNavigation} from "@react-navigation/core";
import ThemedButton from "@/src/components/themed/ThemedButton";

export default function NotAuthenticated() {
    const navigation = useNavigation<any>();
    return (
        <ThemedBackground>
            <Image
                source={require("@/assets/images/GarfieldCharakter.webp")}
                style={{
                    width: 200,
                    height: 200,
                    marginBottom: 12,
                }}
            />
            <ThemedParagraph>
                You are not authenticated. Please log in to view this content.
            </ThemedParagraph>
            <ThemedButton mode="outlined" onPress={() => navigation.navigate("LoginScreen")}>
                Login
            </ThemedButton>
        </ThemedBackground>
    );
}
