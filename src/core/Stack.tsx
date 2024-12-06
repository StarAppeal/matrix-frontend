import React from "react";
import {Stack} from "expo-router";


export default function CustomStack() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
        </Stack>
    );
}
