import React, {useState} from "react";
import {StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import Modal from "react-native-modal";
import ThemedButton from "@/src/components/themed/ThemedButton";

export interface Props {
    resetCallback: () => void;
    children: React.ReactNode;
    buttonTitle: string;
    buttonMode?: 'text' | 'outlined' | 'contained';
}

export default function CustomModal({resetCallback, children, buttonTitle, buttonMode = "outlined"}: Props) {
    const [isVisible, setIsVisible] = useState(false);

    const resetModal = () => {
        setIsVisible(false);
        resetCallback();
    }

    return (
        <>
            <ThemedButton mode={buttonMode} onPress={() => setIsVisible(true)} title={buttonTitle} />
            <Modal isVisible={isVisible} onModalHide={resetModal} onBackdropPress={resetModal} onBackButtonPress={resetModal}>
                <View style={styles.modalContent}>
                    {children}
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
