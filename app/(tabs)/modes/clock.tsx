import React, {useMemo} from "react";
import {View, Text} from "react-native";
import ColorSelector from "@/src/components/themed/ColorSelector";
import  {AdditionalInitialPayload} from "@/src/components/MatrixPreview";
import {useMatrixStore} from "@/src/stores";
import {useAuth} from "@/src/stores/authStore";
import ModeScreenLayout from "@/src/components/ModeScreenLayout";

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
    const clockConfig = useMatrixStore((s) => s.matrixState.clock);
    const updateClockConfig = useMatrixStore((s) => s.updateClockConfig);

    const combinedMemoPayload: AdditionalInitialPayload[] = useMemo(() => [
        {
            "type": "SETTINGS",
            "payload": {"timezone": authenticatedUser?.timezone || "Etc/UTC"}
        },
        mockClockData
    ], [authenticatedUser?.timezone]);

    return (
        <ModeScreenLayout
            mode="clock"
            title="Uhr Modus"
            subtitle="Zeige die Uhrzeit an"
            icon="clock"
            additionalPayload={combinedMemoPayload}
            settingsTitle="Uhr & Wetter"
            settingsDescription="Wähle die Farbe der digitalen Uhr und verfolge das aktuelle Wetter."
        >
            <View>
                <Text className="text-sm font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                    Uhrzeitfarbe
                </Text>
                <ColorSelector
                    onSelect={(color) => updateClockConfig({color})}
                    defaultColor={clockConfig.color}
                />
            </View>
        </ModeScreenLayout>
    );
}