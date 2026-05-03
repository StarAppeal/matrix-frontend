import { Link, Tabs } from 'expo-router';
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useThemeStore } from "@/src/stores";
import AuthenticatedWrapper from "@/src/components/AuthenticatedWrapper";

export default function TabLayout() {
    const { theme } = useThemeStore();

    return (
        <AuthenticatedWrapper>
            <Tabs
                screenOptions={{
                    headerStyle: { backgroundColor: theme.colors.primaryContainer },
                    headerTitleStyle: { color: theme.colors.onPrimaryContainer },
                    headerTitleContainerStyle: { paddingHorizontal: 16 },
                    tabBarActiveTintColor: theme.colors.primary,
                    //sceneContainerStyle: { backgroundColor: theme.colors.background },
                    tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
                    tabBarStyle: {
                        backgroundColor: theme.colors.surface,
                        borderTopColor: theme.colors.outline,
                        elevation: 4,
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Startseite',
                        tabBarIcon: ({ color }) => <Feather size={28} name="home" color={color} />,
                        headerRight: () => (
                            <Link href="/settings" style={{ marginRight: 16 }}>
                                <Feather name="settings" size={24} color={theme.colors.onPrimaryContainer} />
                            </Link>
                        ),
                    }}
                />

                <Tabs.Screen
                    name="modes/index"
                    options={{
                        title: 'Modi',
                        tabBarIcon: ({ color }) => <Feather size={28} name="grid" color={color} />,
                    }}
                />

                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Einstellungen',
                        tabBarIcon: ({ color }) => <Feather size={28} name="settings" color={color} />,
                    }}
                />

                <Tabs.Screen name="modes/text" options={{ href: null, title: 'Text' }} />
                <Tabs.Screen name="modes/image" options={{ href: null, title: 'Bilder' }} />
                <Tabs.Screen name="modes/music" options={{ href: null, title: 'Musik' }} />
                <Tabs.Screen name="modes/clock" options={{ href: null, title: 'Uhr' }} />
               <Tabs.Screen name="modes/game_of_life" options={{ href: null, title: 'Game of Life' }} />
            </Tabs>
        </AuthenticatedWrapper>
    );
}