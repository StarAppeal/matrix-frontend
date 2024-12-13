import React, { useEffect } from "react";
import { Slot } from "expo-router";
import * as Updates from "expo-updates";

export default function App() {
    const checkForUpdates = async () => {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                console.log("Update verfügbar. Wird heruntergeladen...");
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync(); // App neu starten, um Update anzuwenden
            } else {
                console.log("Keine Updates verfügbar.");
            }
        } catch (e) {
            console.error("Fehler beim Prüfen auf Updates:", e);
        }
    };

    useEffect(() => {
        checkForUpdates(); // Nur einmal beim Laden der App ausführen
    }, []);

    return <Slot />;
}
