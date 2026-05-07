import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {restService} from "@/src/services/RestService";
import ModeScreenLayout from "@/src/components/ModeScreenLayout";
import ThemedButton from "@/src/components/themed/ThemedButton";

interface TamoStats {
    hunger: number;
    happiness: number;
    energy: number;
    hygiene: number;
    status: string;
}

export default function TamagotchiScreen() {
    const isFocused = useIsFocused();
    const [stats, setStats] = useState<TamoStats | null>(null);
    const [loadingAction, setLoadingAction] = useState(false);

    const fetchStats = async () => {
        try {
            const res = await restService.getTamagotchi();
            if (res.ok && res.data) {
                setStats(res.data);
            }
        } catch (e) {
            console.error("Failed to fetch Tamagotchi stats", e);
        }
    };

    useEffect(() => {
        if (!isFocused) return;

        fetchStats();
        const interval = setInterval(fetchStats, 10 * 1000);
        return () => clearInterval(interval);
    }, [isFocused]);

    const performAction = async (action: "feed" | "play" | "clean" | "sleep" | "awake") => {
        setLoadingAction(true);
        try {
            let res;
            if (action === "feed") res = await restService.feedTamagotchi();
            else if (action === "play") res = await restService.playTamagotchi();
            else if (action === "clean") res = await restService.cleanTamagotchi();
            else if (action === "sleep") res = await restService.sleepTamagotchi();
            else if (action === "awake") res = await restService.awakeTamagotchi();

            if (res?.ok && res.data) {
                setStats(res.data);
            }
        } finally {
            setTimeout(() => setLoadingAction(false), 1000);
        }
    };

    const ProgressBar = ({label, value, colorClass}: { label: string, value: number, colorClass: string }) => (
        <View className="mb-3">
            <View className="flex-row justify-between mb-1 px-1">
                <Text className="text-xs font-semibold text-onSurface dark:text-onSurface-dark">{label}</Text>
                <Text className="text-xs font-mono text-muted dark:text-muted-dark">{Math.round(value)}%</Text>
            </View>
            <View className="h-3 w-full bg-outline/20 dark:bg-outline-dark/20 rounded-full overflow-hidden">
                <View className={`h-full ${colorClass}`} style={{width: `${Math.max(0, Math.min(100, value))}%`}}/>
            </View>
        </View>
    );

    const isDead = stats?.status === "DEAD";
    const isSleeping = stats?.status === "SLEEPING";

    return (
        <ModeScreenLayout
            mode="tamagotchi"
            title="Tamagotchi"
            subtitle="Pflege dein digitales Haustier"
            icon="smile"
            hidePreview={true}
            settingsTitle="Status & Pflege"
            settingsDescription="Dein Pet lebt auf dem Server. Die Aktionen steuern sein Wohlbefinden live."
            disableSave={false}
        >
            <View className="mb-4">
                <ProgressBar label="🍎 Hunger" value={stats?.hunger || 0} colorClass="bg-red-500"/>
                <ProgressBar label="🎾 Glück" value={stats?.happiness || 0} colorClass="bg-yellow-400"/>
                <ProgressBar label="⚡ Energie" value={stats?.energy || 0} colorClass="bg-blue-500"/>
                <ProgressBar label="🧽 Hygiene" value={stats?.hygiene || 0} colorClass="bg-cyan-400"/>
            </View>

            <View className="flex-row flex-wrap justify-between gap-y-3">
                <View className="w-[48%]">
                    <ThemedButton
                        mode="contained"
                        title="Füttern"
                        icon="food-apple"
                        onPress={() => performAction("feed")}
                        disabled={loadingAction || isDead || isSleeping}
                        className="bg-red-500/20 border border-red-500"
                    />
                </View>
                <View className="w-[48%]">
                    <ThemedButton
                        mode="contained"
                        title="Spielen"
                        icon="tennis-ball"
                        onPress={() => performAction("play")}
                        disabled={loadingAction || isDead || isSleeping}
                        className="bg-yellow-400/20 border border-yellow-400"
                    />
                </View>
                <View className="w-[48%]">
                    <ThemedButton
                        mode="contained"
                        title="Putzen"
                        icon="shower"
                        onPress={() => performAction("clean")}
                        disabled={loadingAction || isDead || isSleeping}
                        className="bg-cyan-400/20 border border-cyan-400"
                    />
                </View>
                <View className="w-[48%]">
                    <ThemedButton
                        mode="contained"
                        title={isSleeping ? "Aufwecken" : "Schlafen"}
                        icon={isSleeping ? "weather-sunny" : "weather-night"}
                        onPress={() => performAction((isSleeping ? "awake" : "sleep"))}
                        disabled={loadingAction || isDead}
                        className={isSleeping ? "bg-orange-500/20 border border-orange-500 text-orange-500" : "bg-blue-500/20 border border-blue-500 text-blue-500"}
                    />
                </View>
            </View>

            {isDead && (
                <View className="mt-4 p-3 bg-red-500/10 rounded-xl border border-red-500/30">
                    <Text className="text-center text-red-500 font-bold">
                        Dein Tamagotchi ist leider verstorben. R.I.P. 🪦
                    </Text>
                </View>
            )}
        </ModeScreenLayout>
    );
}