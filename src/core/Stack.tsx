import React from "react";
import {Slot, Stack} from "expo-router";
import {useThemeStore} from "@/src/stores";


export default function CustomStack() {
    const { theme } = useThemeStore();
    return (
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }}>
            <Slot />
        </Stack>
    );
}
