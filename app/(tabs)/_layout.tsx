import {Link, Tabs} from 'expo-router';
import React from "react";
import {Feather} from "@expo/vector-icons";
import {useThemeStore} from "@/src/stores";
import AuthenticatedWrapper from "@/src/components/AuthenticatedWrapper";
import { useWindowDimensions } from "react-native";

const tabs = [
    {name: 'modes/text', title: 'Text', icon: 'type'},
    {name: 'modes/image', title: 'Bilder', icon: 'image'},
    {name: 'index', title: 'Startseite', icon: 'home'},
    {name: 'modes/music', title: 'Musik', icon: 'music'},
    {name: 'modes/clock', title: 'Uhr', icon: 'clock'},
] as const;

export default function TabLayout() {
    const {theme} = useThemeStore();
    const { width } = useWindowDimensions();
    const shouldHideText = (width < 400);

    return (
        <AuthenticatedWrapper>
                <Tabs
                    screenOptions={({route}) => ({
                        headerStyle: {
                            backgroundColor: theme.colors.primaryContainer,
                        },
                        headerTitleStyle: {
                            color: theme.colors.onPrimaryContainer,
                        },
                        headerTitleContainerStyle: {
                            paddingHorizontal: 16,
                        },
                        headerRight: () => (
                            <Link href="/settings" style={{marginRight: 16}}>
                                <Feather
                                    name="settings"
                                    size={24}
                                    color={theme.colors.onPrimaryContainer}
                                />
                            </Link>
                        ),
                        tabBarActiveTintColor: theme.colors.primary,
                        sceneContainerStyle: {
                            backgroundColor: theme.colors.background,
                        },
                        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
                        tabBarStyle: {
                            backgroundColor: theme.colors.surface,
                            borderTopColor: theme.colors.outline,
                            elevation: 4,
                        },
                        tabBarItemStyle: {
                            borderLeftWidth: route.name === tabs[0].name ? 0 : 1,
                            borderLeftColor: theme.colors.outlineVariant,
                        },
                    })}
                >
                    {tabs.map(({name, title, icon}) => (
                        <Tabs.Screen
                            key={name}
                            name={name}
                            options={{
                                title: shouldHideText ? '' : title,
                                tabBarIcon: ({color}) => (
                                    <Feather size={28} name={icon} color={color}/>
                                ),
                            }}
                        />
                    ))}

                    <Tabs.Screen
                        name="settings"
                        options={{
                            title: 'Einstellungen',
                            href: null, // prevents showing in the tab bar
                        }}
                    />
                </Tabs>
        </AuthenticatedWrapper>
    );
}
