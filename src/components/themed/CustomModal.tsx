import React from "react";
import {StyleSheet, View} from "react-native";
import Modal from "react-native-modal";

export interface CustomModalHandles {
    open: () => void;
    close: () => void;
}

export interface Props {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    onModalDidHide?: () => void;
}

const CustomModal = ({ isVisible, onClose, children, onModalDidHide }: Props) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            onModalHide={onModalDidHide}
            animationIn="zoomIn"
            animationOut="zoomOut"
            backdropTransitionOutTiming={0}
        >
            <View style={styles.modalContent}>
                {children}
            </View>
        </Modal>
    );
};

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
