import React, { useState } from "react";
import { View, Text } from "react-native";
import ThemedButton from "@/src/components/themed/ThemedButton";
import { useMatrixStore } from "@/src/stores";
import { restService } from "@/src/services/RestService";
import { MatrixState } from "@/src/model/User";

interface SaveToMatrixButtonProps {
    mode: MatrixState['global']['mode'];
    className?: string;
}

export default function SaveToMatrixButton({ mode, className }: SaveToMatrixButtonProps) {
    const setGlobalMode = useMatrixStore((s) => s.setGlobalMode);

    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleSave = async () => {
        setSaving(true);
        setFeedback(null);

        try {
            setGlobalMode(mode);

            await new Promise(resolve => setTimeout(resolve, 50));

            const updatedState = useMatrixStore.getState().matrixState;

            const response = await restService.updateLastState(updatedState);

            if (response.ok) {
                setFeedback({ type: 'success', message: 'Gespeichert!' });
                console.log("Matrix State gespeichert:", updatedState);
            } else {
                setFeedback({ type: 'error', message: 'Fehler beim Speichern' });
            }
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
            setFeedback({ type: 'error', message: 'Verbindungsfehler' });
        } finally {
            setSaving(false);

            setTimeout(() => setFeedback(null), 3000);
        }
    };

    return (
        <View className={`gap-2 ${className || ''}`}>
            {feedback && (
                <View className={`p-3 rounded-xl ${feedback.type === 'success' ? 'bg-success/20' : 'bg-error/20'}`}>
                    <Text className={`text-center text-sm font-medium ${feedback.type === 'success' ? 'text-success' : 'text-error'}`}>
                        {feedback.message}
                    </Text>
                </View>
            )}
            <ThemedButton
                mode="contained"
                onPress={handleSave}
                title={saving ? "Speichern..." : "An Matrix senden"}
                icon="send"
                disabled={saving}
            />
        </View>
    );
}

