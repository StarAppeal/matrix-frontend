import React from "react";
import {Slot, Stack} from "expo-router";


export default function CustomStack() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Slot />
        </Stack>
    );
}
