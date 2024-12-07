import React, {useState} from "react";
import {Paragraph, Button} from "react-native-paper";
import ThemedTextInput from "@/src/components/themed/ThemedTextInput";
import {useTheme} from "@/src/context/ThemeProvider";
import Modal from "react-native-modal";
import {View, StyleSheet} from "react-native";

export default function ChangePasswordModal() {
    const {theme} = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<{ message: string } | null>(null);

    const handleConfirm = () => {
        if (password !== confirmPassword) {
            setError({message: "Passwörter stimmen nicht überein!"});
            return;
        }
        console.log("Passwort erfolgreich geändert!");

    };
    const resetModal = () => {
        setIsVisible(false);
        setError(null);
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <>
            <Button mode="outlined" onPress={() => setIsVisible(true)}>
                Passwort ändern
            </Button>
            <Modal isVisible={isVisible} onBackdropPress={resetModal}>
                <View style={styles.modalContent}>
                    <Paragraph>Passwort ändern</Paragraph>
                    {error && (
                        <View style={[styles.errorBox, {backgroundColor: theme.colors.error}]}>
                            <Paragraph style={{color: theme.colors.onError}}>{error.message}</Paragraph>
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
    errorBox: {
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
