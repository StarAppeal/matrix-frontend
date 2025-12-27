import React from "react";
import { View } from "react-native";
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
    className?: string;
}

const CustomModal = ({ isVisible, onClose, children, onModalDidHide, className }: Props) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            onModalHide={onModalDidHide}
            animationIn="zoomIn"
            animationOut="zoomOut"
            backdropTransitionOutTiming={0}
            backdropOpacity={0.6}
        >
            <View className={`p-4 rounded-2xl ${className || ''}`}>
                {children}
            </View>
        </Modal>
    );
};

export default CustomModal;

