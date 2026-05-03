import React from "react";
import {View, Text, ScrollView} from "react-native";
import {Feather} from "@expo/vector-icons";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ColorSelector from "@/src/components/themed/ColorSelector";
import SaveToMatrixButton from "@/src/components/SaveToMatrixButton";
import MatrixPreview, {AdditionalInitialPayload} from "@/src/components/MatrixPreview";
import {useMatrixStore} from "@/src/stores";
import {useColors} from "@/src/hooks/useColors";
import {useAuth} from "@/src/stores/authStore";

const mockClockData: AdditionalInitialPayload =
    {
        "type": "WEATHER_UPDATE",
        "payload": {
            "weather": {
                "temp": {"cur": 13.64, "min": 12.32, "max": 14.05},
                "feelsLike": {"cur": 13.02},
                "pressure": 1013,
                "humidity": 75,
                "clouds": 0,
                "visibility": 10000,
                "wind": {"deg": 200, "speed": 2.57},
                "rain": 0,
                "snow": 0,
                "conditionId": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": {"url": "http://openweathermap.org/img/wn/01n@2x.png", "raw": "01n"}
            }
        }
    }


export default function ClockScreen() {
    const {authenticatedUser} = useAuth();
    const {colors} = useColors();
    const clockConfig = useMatrixStore((s) => s.matrixState.clock);
    const updateClockConfig = useMatrixStore((s) => s.updateClockConfig);
    const settingsPayload = {"type": "SETTINGS", "payload": {"timezone": authenticatedUser?.timezone || "Etc/UTC"}}

    return (
        <ThemedBackground>
            <View className="flex-1">
                <ThemedHeader subtitle="Zeige die Uhrzeit an">
                    Uhr Modus
                </ThemedHeader>

                <ScrollView
                    className="flex-1 px-4"
                    contentContainerStyle={{paddingBottom: 100}}
                    showsVerticalScrollIndicator={false}
                >
                    <MatrixPreview mode="clock" additionalPayload={[settingsPayload, mockClockData]}/>

                    <View
                        className="bg-surface dark:bg-surface-dark rounded-2xl p-6 mt-4 shadow-sm border border-outline/10">
                        <View className="items-center mb-6">
                            <View
                                className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-light/10 items-center justify-center mb-3">
                                <Feather name="clock" size={32} color={colors.primary}/>
                            </View>
                            <Text className="text-base font-medium text-onSurface dark:text-onSurface-dark">
                                Uhr Anzeige
                            </Text>
                        </View>

                        <View>
                            <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                                Uhrzeitfarbe
                            </Text>
                            <ColorSelector
                                onSelect={(color) => updateClockConfig({color})}
                                defaultColor={clockConfig.color}
                            />
                        </View>
                    </View>
                </ScrollView>

                <View className="absolute bottom-4 left-4 right-4">
                    <SaveToMatrixButton mode="clock"/>
                </View>
            </View>
        </ThemedBackground>
    );
}