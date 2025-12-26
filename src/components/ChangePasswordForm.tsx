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
        <View className="p-5 rounded-xl self-center w-full max-w-[400px] bg-surface dark:bg-surface-dark">
            <Text
                variant="titleMedium"
                className="text-lg mb-2.5 text-onSurface dark:text-onSurface-dark"
            >
                Passwort ändern
            </Text>

            {apiResponse && apiResponse.data?.message && (
                <View
                    className={`my-2 p-3 rounded-lg ${apiResponse.ok ? 'bg-success' : 'bg-error'}`}
                >
                    <Text
                        variant="bodyMedium"
                        className="text-white"
                    >
                        {apiResponse.data.message}
                    </Text>
                </View>
            )}

            {!apiResponse?.ok && (
                <>
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
                </>
            )}

            <View className="flex-row justify-end gap-2.5 mt-4">
                {apiResponse?.ok ? (
                    <ThemedButton mode="contained" onPress={onCancel} title={"Schließen"} style={{flex: 1}} />
                ) : (
                    <>
                        <ThemedButton mode="elevated" onPress={onCancel} title={"Abbrechen"} />
                        <ThemedButton mode="contained" onPress={handleConfirm} title={"Bestätigen"} />
                    </>
                )}
            </View>
        </View>
    );
}

