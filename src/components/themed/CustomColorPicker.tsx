import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import ColorPicker, {Panel1, Swatches, Preview, HueSlider, ColorFormatsObject} from 'reanimated-color-picker';
import CustomModal from "@/src/components/themed/CustomModal";
import ThemedButton from "@/src/components/themed/ThemedButton";
import {useTheme} from "@/src/context/ThemeProvider";

interface CustomColorPickerProps {
    defaultColor?: [number, number, number];
    onSelect: (rgb: [number, number, number]) => void;
}

export default function CustomColorPicker({defaultColor = [255, 255, 255], onSelect}: CustomColorPickerProps) {
    const [currentColor, setCurrentColor] = useState(defaultColor);
    const {theme} = useTheme();

    const rgbToHex = ([r, g, b]: [number, number, number]) =>
        `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    const hexToRgbArray = (hex: string): [number, number, number] => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
            : [255, 255, 255];
    };

    const [pickerHex, setPickerHex] = useState(rgbToHex(defaultColor));

    useEffect(() => {
        setCurrentColor(defaultColor);
        setPickerHex(rgbToHex(defaultColor));
    }, [defaultColor]);

    const {width, height} = Dimensions.get('window');
    const pickerWidth = Math.min(400, width * 0.9);
    const pickerHeight = Math.min(400, height * 0.6);

    const handleOk = () => {
        const rgb = hexToRgbArray(pickerHex);
        setCurrentColor(rgb);
        onSelect(rgb);
        console.log(rgb)
    };

    const resetModal = () => {
        setCurrentColor(defaultColor);
    }

    return (
        <View style={styles.container}>
            <CustomModal resetCallback={resetModal} buttonTitle={"Color Picker"} buttonMode={"outlined"}>
                <View style={styles.modalWrapper}>
                    <View style={[styles.modalContent, {width: pickerWidth, backgroundColor: theme.colors.onSurface}]}>
                        <ColorPicker
                            style={{width: pickerWidth * 0.9, height: pickerHeight}}
                            value={pickerHex}
                            onComplete={(color: ColorFormatsObject) => setPickerHex(color.hex)}
                        >
                            <Preview style={{marginBottom: 15}}/>
                            <Panel1 style={{marginBottom: 15}}/>
                            <HueSlider style={{marginBottom: 15}}/>
                            <Swatches style={{marginTop: 10, marginBottom: 20}}/>
                        </ColorPicker>

                        <View style={styles.buttonContainer}>
                            <ThemedButton mode="contained" onPress={handleOk} title={"Bestätigen"}/>
                        </View>
                    </View>
                </View>
            </CustomModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    modalContent: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 15,
        width: '50%',
    },
});
