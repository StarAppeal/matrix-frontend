import {Link, Tabs} from 'expo-router';
import React from "react";
import {Feather} from "@expo/vector-icons";
import {useTheme} from "@/src/context/ThemeProvider";
import AuthenticatedWrapper from "@/src/components/AuthenticatedWrapper";
import {Dimensions} from "react-native";

const screenWidth = Dimensions.get("window").width;


const tabs = [
    {name: 'modes/text', title: 'Text', icon: 'type'},
    {name: 'modes/image', title: 'Bilder', icon: 'image'},
    {name: 'index', title: 'Startseite', icon: 'home'},
    {name: 'modes/music', title: 'Musik', icon: 'music'},
    {name: 'modes/clock', title: 'Uhr', icon: 'clock'},
] as const;

export default function TabLayout() {
    const theme = useTheme();
    const shouldHideText = (screenWidth < 400);

    return (
        <AuthenticatedWrapper>
            <Tabs
                screenOptions={({route}) => ({
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
                    tabBarItemStyle: {
                        borderLeftWidth: route.name === tabs[0].name ? 0 : 1,
                        borderLeftColor: theme.theme.colors.outlineVariant, // Trennlinienfarbe
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
