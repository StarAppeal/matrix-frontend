import React, {useMemo} from "react";
import {useMatrixStore} from "@/src/stores";
import {useAuth} from "@/src/stores/authStore";
import ThemedCheckbox from "@/src/components/themed/ThemedCheckbox";
import ModeScreenLayout from "@/src/components/ModeScreenLayout";

export default function MusicScreen() {
    const {authenticatedUser} = useAuth();
    const musicConfig = useMatrixStore((s) => s.matrixState.music);
    const updateMusicConfig = useMatrixStore((s) => s.updateMusicConfig);
    const hasLastFm = !!authenticatedUser?.lastFmUsername;

    const mockMusicData = useMemo(() => [{
        "type": "MUSIC_UPDATE",
        "payload": {
            "isPlaying": true,
            "title": "Never Gonna Give You Up",
            "artist": "Rick Astley",
            "imageUrl": "https://lastfm.freetls.fastly.net/i/u/300x300/7eedf5854f216eba1908447afdb746d6.jpg"
        }
    }], []);

    return (
        <ModeScreenLayout
            mode="music"
            title="Musik Modus"
            subtitle="Visualisiere deine Musik"
            icon="music"
            additionalPayload={mockMusicData}
            disableSave={!hasLastFm}
            warningText={!hasLastFm ? "Verbinde Last.fm in den Einstellungen, um diesen Modus zu nutzen!" : undefined}
            settingsTitle={"Musik-Visualisierung"}
            settingsDescription={"Aktiviere den Vollbild-Modus, um das Album-Cover größer darzustellen."}
        >
            <ThemedCheckbox
                label="Vollbild-Modus"
                description="Zeigt das Album-Cover im Vollbild an"
                value={musicConfig.fullscreen}
                onValueChange={(fullscreen) => updateMusicConfig({fullscreen})}
            />
        </ModeScreenLayout>
    );
}