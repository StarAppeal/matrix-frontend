import React, {forwardRef, useImperativeHandle, useState} from "react";
import {StyleSheet, View} from "react-native";
import Modal from "react-native-modal";
import ThemedButton from "@/src/components/themed/ThemedButton";

export interface CustomModalHandles {
    open: () => void;
    close: () => void;
}

export interface Props {
    resetCallback: () => void;
    children: React.ReactNode;
    buttonTitle: string;
    buttonMode?: 'text' | 'outlined' | 'contained';
}

const CustomModal = forwardRef<CustomModalHandles, Props>(
    ({resetCallback, children, buttonTitle, buttonMode = "outlined"}, ref) => {
        const [isVisible, setIsVisible] = useState(false);

        const resetModal = () => {
            setIsVisible(false);
            resetCallback();
        };

        useImperativeHandle(ref, () => ({
            open: () => setIsVisible(true),
            close: () => setIsVisible(false),
        }));

        return (
            <>
                <ThemedButton mode={buttonMode} onPress={() => setIsVisible(true)} title={buttonTitle} />
                <Modal
                    isVisible={isVisible}
                    onModalHide={resetModal}
                    onBackdropPress={resetModal}
                    onBackButtonPress={resetModal}
                >
                    <View style={styles.modalContent}>
                        {children}
                    </View>
                </Modal>
            </>
        );
    }
);

export default CustomModal;

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
