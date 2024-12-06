import {Tabs} from 'expo-router';
import React from "react";
import {FontAwesome} from "@expo/vector-icons";
import {useTheme} from "@/src/context/ThemeProvider";
import AuthenticatedWrapper from "@/src/components/AuthenticatedWrapper";

export default function TabLayout() {
    const theme = useTheme();
    return (
        <AuthenticatedWrapper>
            <Tabs
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.theme.colors.primaryContainer,
                    },
                    headerTitleStyle: {
                        color: theme.theme.colors.onPrimaryContainer,
                    },
                    headerTitleContainerStyle: {
                        paddingHorizontal: 16,
                    },
                    tabBarActiveTintColor: theme.theme.colors.primary,
                    tabBarInactiveTintColor: theme.theme.colors.onSurfaceVariant,
                    tabBarStyle: {
                        backgroundColor: theme.theme.colors.surface,
                        borderTopColor: theme.theme.colors.outline,
                        elevation: 4,
                    },
                }}
            >
                <Tabs.Screen
                    name={'modes/text'}
                    options={{
                        title: 'Text',
                        tabBarIcon: ({color}) => <FontAwesome size={28} name="file-text" color={color}/>,
                    }}
                />
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({color}) => <FontAwesome size={28} name="home" color={color}/>,
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({color}) => <FontAwesome size={28} name="cog" color={color}/>,
                    }}
                />
            </Tabs>
        </AuthenticatedWrapper>

    );
}
