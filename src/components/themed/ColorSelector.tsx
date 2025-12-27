import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import ColorPicker, { Panel1, Swatches, Preview, HueSlider, ColorFormatsObject } from 'reanimated-color-picker';
import ThemedButton from "@/src/components/themed/ThemedButton";
import ThemedColorPickerButton from "@/src/components/themed/ThemedColorPickerButton";
import CustomModal from './CustomModal';


interface ColorSelectorProps {
    defaultColor?: [number, number, number];
    onSelect: (rgb: [number, number, number]) => void;
}

export default function ColorSelector({ defaultColor = [255, 255, 255], onSelect }: ColorSelectorProps) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pickerHex, setPickerHex] = useState(() => rgbToHex(defaultColor));
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 400;

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
                <View className={`p-5 rounded-2xl self-center items-center bg-surface dark:bg-surface-dark ${isSmallScreen ? 'w-[90%]' : 'w-[350px]'}`}>
                    <ColorPicker
                        value={pickerHex}
                        onComplete={(color: ColorFormatsObject) => setPickerHex(color.hex)}
                    >
                        <Preview style={{ marginBottom: 16, borderRadius: 12 }} />
                        <Panel1 style={{ marginBottom: 16, borderRadius: 12 }} />
                        <HueSlider style={{ marginBottom: 16, borderRadius: 20 }} />
                        <Swatches style={{ marginTop: 8 }} />
                    </ColorPicker>

                    <ThemedButton
                        className="mt-5 w-full"
                        mode="contained"
                        onPress={handleConfirm}
                        title={"Bestätigen"}
                    />
                </View>
            </CustomModal>
        </View>
    );
}


const rgbToHex = ([r, g, b]: [number, number, number]) =>
    `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

const hexToRgbArray = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : [255, 255, 255];
};