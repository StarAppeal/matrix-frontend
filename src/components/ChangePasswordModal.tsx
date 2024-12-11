import React, {useState} from "react";
import {Button, Paragraph} from "react-native-paper";
import ThemedTextInput from "@/src/components/themed/ThemedTextInput";
import {useTheme} from "@/src/context/ThemeProvider";
import {StyleSheet, View, Modal} from "react-native";
import {RestService} from "@/src/services/RestService";
import {useAuth} from "@/src/context/AuthProvider";

export default function ChangePasswordModal() {
    const {theme} = useTheme();
    const {token: jwtToken} = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [apiResponse, setApiResponse] = useState<{ success: boolean, message: string } | null>(null);

    const handleConfirm = () => {
        if (!password || !confirmPassword) {
            setApiResponse({success: false, message: "Bitte füllen Sie alle Felder aus!"});
            return;
        }
        if (password !== confirmPassword) {
            setApiResponse({success: false, message: "Passwörter stimmen nicht überein!"});
            return;
        }
        new RestService(jwtToken).changeSelfPassword(password, confirmPassword).then(
            (response) => {
                setApiResponse(response);
                if (response.success) {
                    // add something here
                    console.log("Password changed successfully");
                    setPassword("");
                    setConfirmPassword("");
                }
            }
        )


    };
    const resetModal = () => {
        setIsVisible(false);
        setApiResponse(null);
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <>
            <Button mode="outlined" onPress={() => setIsVisible(true)}>
                Passwort ändern
            </Button>
            <Modal visible={isVisible} onDismiss={resetModal} animationType={"slide"} transparent={true}>
                <View style={styles.modalContent}>
                    <Paragraph>Passwort ändern</Paragraph>
                    {apiResponse && apiResponse.message && (
                        <View
                            style={[styles.apiResponseBox, {backgroundColor: apiResponse.success ? theme.colors.success : theme.colors.error}]}>
                            <Paragraph
                                style={{color: apiResponse.success ? theme.colors.onSuccess : theme.colors.onError}}>{apiResponse.message}</Paragraph>
                        </View>
                    )}

                    <ThemedTextInput
                        label="Passwort"
                        returnKeyType="next"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <ThemedTextInput
                        label="Passwort bestätigen"
                        returnKeyType="done"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />

                    <View style={styles.buttonGroup}>
                        <Button mode="contained" onPress={handleConfirm}>
                            Bestätigen
                        </Button>
                        <Button mode="elevated" onPress={resetModal}>
                            Abbrechen
                        </Button>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        padding: 16,
        borderRadius: 8,
    },
    apiResponseBox: {
        marginBottom: 8,
        marginTop: 8,
        padding: 8,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
});
