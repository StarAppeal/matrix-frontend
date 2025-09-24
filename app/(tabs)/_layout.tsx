import {Link, Tabs} from 'expo-router';
import React, {createContext, useContext, useState, useEffect } from "react";
import {Feather} from "@expo/vector-icons";
import {useTheme} from "@/src/context/ThemeProvider";
import AuthenticatedWrapper from "@/src/components/AuthenticatedWrapper";
import { useWindowDimensions } from "react-native";
import {MatrixState} from "@/src/model/User";
import {useAuth} from "@/src/context/AuthProvider";



const tabs = [
    {name: 'modes/text', title: 'Text', icon: 'type'},
    {name: 'modes/image', title: 'Bilder', icon: 'image'},
    {name: 'index', title: 'Startseite', icon: 'home'},
    {name: 'modes/music', title: 'Musik', icon: 'music'},
    {name: 'modes/clock', title: 'Uhr', icon: 'clock'},
] as const;

type MatrixContextType = {
    matrixState: MatrixState;
    updateMatrixState: (newState: Partial<MatrixState>) => void;
};

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

export const useMatrix = () => {
    const context = useContext(MatrixContext);
    if (!context) throw new Error("useMatrix must be used within a MatrixProvider");
    return context;
};

const getInitialState = (lastState?: MatrixState | null): MatrixState => {
    const defaults: MatrixState = {
        global: { mode: 'idle', brightness: 100 },
        text: { text: 'Hello World', align: 'center', speed: 50, size: 16, color: [255, 255, 255] },
        image: { image: 'dino.gif' },
        clock: { color: [0, 255, 0] },
        music: { fullscreen: false }
    };

    return {
        ...defaults,
        ...(lastState || {}),
        global: { ...defaults.global, ...(lastState?.global || {}) },
        text: { ...defaults.text, ...(lastState?.text || {}) },
        image: { ...defaults.image, ...(lastState?.image || {}) },
        clock: { ...defaults.clock, ...(lastState?.clock || {}) },
        music: { ...defaults.music, ...(lastState?.music || {}) },
    };
};

export default function TabLayout() {
    const {theme} = useTheme();
    const {authenticatedUser} = useAuth();
    const { width } = useWindowDimensions();
    const shouldHideText = (width < 400);

    const [matrixState, setMatrixState] = useState<MatrixState>(() => getInitialState(authenticatedUser?.lastState));
    const updateMatrixState = (newState: Partial<MatrixState>) => {
        setMatrixState(prevState => ({...prevState, ...newState}));
    };

    useEffect(() => {
        if (authenticatedUser?.lastState) {
            console.log("Authenticated user or lastState changed, updating matrix context...");
            setMatrixState(getInitialState(authenticatedUser.lastState));
        }
    }, [authenticatedUser]);

    return (
        <AuthenticatedWrapper>
            <MatrixContext.Provider value={{matrixState, updateMatrixState}}>
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
            </MatrixContext.Provider>
        </AuthenticatedWrapper>
    );
}
