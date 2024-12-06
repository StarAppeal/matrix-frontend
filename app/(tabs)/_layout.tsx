import {Link, Tabs} from 'expo-router';
import React from "react";
import {Feather} from "@expo/vector-icons";
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
                    headerRight: () => (
                        <Link href="/settings" style={{marginRight: 16}}>
                            <Feather
                                name="settings"
                                size={24}
                                color={theme.theme.colors.onPrimaryContainer}
                            />
                        </Link>
                    ),
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
                        tabBarIcon: ({color}) => <Feather size={28} name="type" color={color}/>,
                    }}
                />

                <Tabs.Screen
                    name={'modes/image'}
                    options={{
                        title: 'Bilder',
                        tabBarIcon: ({color}) => <Feather size={28} name="image" color={color}/>,
                    }}/>

                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Startseite',
                        tabBarIcon: ({color}) => <Feather size={28} name="home" color={color}/>,
                    }}
                />


                <Tabs.Screen
                    name={'modes/music'}
                    options={{
                        title: 'Musik',
                        tabBarIcon: ({color}) => <Feather size={28} name="music" color={color}/>,
                    }}/>


                <Tabs.Screen
                    name={'modes/clock'}
                    options={{
                        title: 'Uhr',
                        tabBarIcon: ({color}) => <Feather size={28} name="clock" color={color}/>,
                    }}/>

                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Einstellungen',
                        href: null, // prevents showing in the tab bar
                    }}
                />
            </Tabs>
        </AuthenticatedWrapper>

    )
        ;
}
