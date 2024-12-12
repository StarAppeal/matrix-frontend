import React, {useState} from "react";
import {Button} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import Modal from "react-native-modal";

export interface Props {
    resetCallback: () => void;
    children: React.ReactNode;
    buttonTitle: string;
}

export default function CustomModal({resetCallback, children, buttonTitle}: Props) {
    const [isVisible, setIsVisible] = useState(false);

    const resetModal = () => {
        setIsVisible(false);
        resetCallback();
    }

    return (
        <>
            <Button mode="outlined" onPress={() => setIsVisible(true)}>
                {buttonTitle}
            </Button>
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
