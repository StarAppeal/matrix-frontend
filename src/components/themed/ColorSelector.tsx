import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ColorPicker, { Panel1, Swatches, Preview, HueSlider, ColorFormatsObject } from 'reanimated-color-picker';
import ThemedButton from "@/src/components/themed/ThemedButton";
import { useTheme } from "@/src/context/ThemeProvider";
import ThemedColorPickerButton from "@/src/components/themed/ThemedColorPickerButton";
import CustomModal from './CustomModal'; // Importiere den NEUEN CustomModal


interface ColorSelectorProps {
    defaultColor?: [number, number, number];
    onSelect: (rgb: [number, number, number]) => void;
}

export default function ColorSelector({ defaultColor = [255, 255, 255], onSelect }: ColorSelectorProps) {
    const { theme } = useTheme();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [pickerHex, setPickerHex] = useState(() => rgbToHex(defaultColor));

    const openModal = () => {
        setPickerHex(rgbToHex(defaultColor));
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleConfirm = () => {
        const rgb = hexToRgbArray(pickerHex);
        onSelect(rgb);
        closeModal();
    };

    const { width } = Dimensions.get('window');
    const modalWidth = Math.min(350, width * 0.9);

    return (
        <View>
            <ThemedColorPickerButton
                color={defaultColor}
                onPress={openModal}
            />

            <CustomModal
                isVisible={isModalVisible}
                onClose={closeModal}
            >
                <View style={[styles.modalContent, { width: modalWidth, backgroundColor: theme.colors.surface }]}>
                    <ColorPicker
                        style={{ width: '100%' }}
                        value={pickerHex}
                        onComplete={(color: ColorFormatsObject) => setPickerHex(color.hex)}
                    >
                        <Preview style={{ marginBottom: 15 }} />
                        <Panel1 style={{ marginBottom: 15 }} />
                        <HueSlider style={{ marginBottom: 15 }} />
                        <Swatches style={{ marginTop: 10 }} />
                    </ColorPicker>

                    <ThemedButton
                        style={{ marginTop: 20, width: '100%' }}
                        mode="contained"
                        onPress={handleConfirm}
                        title={"Bestätigen"}
                    />
                </View>
            </CustomModal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        padding: 20,
        borderRadius: 12,
        alignSelf: 'center',
        alignItems: 'center',
    },
});

const rgbToHex = ([r, g, b]: [number, number, number]) =>
    `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

const hexToRgbArray = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : [255, 255, 255];
};