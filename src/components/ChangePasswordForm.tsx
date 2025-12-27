import React, {useRef, useState} from "react";
import { TextInput, View } from "react-native";
import { ApiResponse, RestService } from "@/src/services/RestService";
import { useAuth } from "@/src/stores/authStore";
import PasswordInput from "@/src/components/PasswordInput";
import ThemedButton from "@/src/components/themed/ThemedButton";
import { Text } from "react-native-paper";


interface ChangePasswordFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ChangePasswordForm({ onSuccess, onCancel }: ChangePasswordFormProps) {
    const { token: jwtToken } = useAuth();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [apiResponse, setApiResponse] = useState<ApiResponse<{ message: string }> | null>(null);

    const confirmPasswordRef = useRef<TextInput>(null);

    const handleConfirm = async () => {
        if (!password || !confirmPassword) {
            setApiResponse({ ok: false, data: { message: "Bitte füllen Sie alle Felder aus!" } });
            return;
        }
        if (password !== confirmPassword) {
            setApiResponse({ ok: false, data: { message: "Passwörter stimmen nicht überein!" } });
            return;
        }

        const response = await new RestService(jwtToken).changeSelfPassword(password, confirmPassword);
        setApiResponse(response);

        if (response.ok) {
            setTimeout(() => {
                onSuccess();
            }, 1500);
        }
    };

    return (
        <View className="p-6 rounded-2xl self-center w-full max-w-[400px] bg-surface dark:bg-surface-dark">
            <Text
                variant="titleMedium"
                className="text-lg font-semibold mb-4 text-onSurface dark:text-onSurface-dark"
            >
                Passwort ändern
            </Text>

            {apiResponse && apiResponse.data?.message && (
                <View className={`my-3 p-4 rounded-xl ${apiResponse.ok ? 'bg-success' : 'bg-error'}`}>
                    <Text variant="bodyMedium" className="text-white font-medium">
                        {apiResponse.data.message}
                    </Text>
                </View>
            )}

            {!apiResponse?.ok && (
                <View className="gap-2">
                    <PasswordInput
                        label="Neues Passwort"
                        value={password}
                        onChangeText={setPassword}
                        returnKeyType="next"
                        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                        submitBehavior="submit"
                    />
                    <PasswordInput
                        ref={confirmPasswordRef}
                        label="Passwort bestätigen"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        returnKeyType="go"
                        onSubmitEditing={handleConfirm}
                    />
                </View>
            )}

            <View className="flex-row justify-end gap-3 mt-5">
                {apiResponse?.ok ? (
                    <ThemedButton mode="contained" onPress={onCancel} title="Schließen" className="flex-1" />
                ) : (
                    <>
                        <ThemedButton mode="outlined" onPress={onCancel} title="Abbrechen" />
                        <ThemedButton mode="contained" onPress={handleConfirm} title="Bestätigen" />
                    </>
                )}
            </View>
        </View>
    );
}

