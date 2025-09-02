import React, {useState} from "react";
import { Paragraph} from "react-native-paper";
import {useTheme} from "@/src/context/ThemeProvider";
import {StyleSheet, View} from "react-native";
import {RestService} from "@/src/services/RestService";
import {useAuth} from "@/src/context/AuthProvider";
import CustomModal from "@/src/components/themed/CustomModal";
import PasswordInput from "@/src/components/PasswordInput";
import ThemedButton from "@/src/components/themed/ThemedButton";


export default function ChangePasswordModal() {
    const {theme} = useTheme();
    const {token: jwtToken} = useAuth();
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
                console.log(response);
                setApiResponse(response.result);
                if (response.result.success) {
                    // add something here
                    setPassword("");
                    setConfirmPassword("");
                }
            }
        )


    };
    const resetModal = () => {
        setApiResponse(null);
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <>
            <CustomModal resetCallback={resetModal} buttonTitle="Passwort ändern">
                <View style={styles.modalContent}>
                    <Paragraph>Passwort ändern</Paragraph>
                    {apiResponse && apiResponse.message && (
                        <View
                            style={[styles.apiResponseBox, {backgroundColor: apiResponse.success ? theme.colors.success : theme.colors.error}]}>
                            <Paragraph
                                style={{color: apiResponse.success ? theme.colors.onSuccess : theme.colors.onError}}>{apiResponse.message}</Paragraph>
                        </View>
                    )}

                    <PasswordInput
                        label="Passwort"
                        returnKeyType="next"
                        value={password}
                        onChangeText={setPassword}
                        autoComplete={"new-password"}
                    />
                    <PasswordInput
                        label="Passwort bestätigen"
                        returnKeyType="go"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        autoComplete={"new-password"}
                    />

                    <View style={styles.buttonGroup}>
                        <ThemedButton mode="contained" onPress={handleConfirm} title={"Bestätigen"} />
                    </View>
                </View>
            </CustomModal>
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
