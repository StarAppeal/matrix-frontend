import React, {useRef, useState} from "react";
import { useTheme } from "@/src/context/ThemeProvider";
import {StyleSheet, TextInput, View} from "react-native";
import { ApiResponse, RestService } from "@/src/services/RestService";
import { useAuth } from "@/src/context/AuthProvider";
import PasswordInput from "@/src/components/PasswordInput";
import ThemedButton from "@/src/components/themed/ThemedButton";
import { Text } from "react-native-paper";


interface ChangePasswordFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ChangePasswordForm({ onSuccess, onCancel }: ChangePasswordFormProps) {
    const { theme } = useTheme();
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
        <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface, fontSize: 18, marginBottom: 10 }}>Passwort ändern</Text>

            {apiResponse && apiResponse.data?.message && (
                <View style={[styles.apiResponseBox, { backgroundColor: apiResponse.ok ? theme.colors.success : theme.colors.error }]}>
                    <Text variant="bodyMedium"style={{ color: apiResponse.ok ? theme.colors.onSuccess : theme.colors.onError }}>
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

            <View style={styles.buttonGroup}>
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

const styles = StyleSheet.create({
    modalContent: {
        padding: 20,
        borderRadius: 12,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 400,
    },
    apiResponseBox: {
        marginBottom: 8,
        marginTop: 8,
        padding: 12,
        borderRadius: 8,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 16,
    },
});