import React, { useState } from "react";
import CustomModal from "@/src/components/themed/CustomModal";
import ThemedButton from "@/src/components/themed/ThemedButton";
import ChangePasswordForm from "./ChangePasswordForm"; // Unser neues Formular

export default function ChangePasswordFeature() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <ThemedButton
                mode="outlined"
                icon="key-variant"
                onPress={() => setIsModalVisible(true)}
                title="Passwort ändern"
            />

            <CustomModal
                isVisible={isModalVisible}
                onClose={closeModal}
            >
                <ChangePasswordForm
                    onSuccess={closeModal}
                    onCancel={closeModal}
                />
            </CustomModal>
        </>
    );
}