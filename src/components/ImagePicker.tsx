import React, {useState} from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from "@/src/components/ImageViewer";
import {ImagePickerSuccessResult} from "expo-image-picker/src/ImagePicker.types";
import ThemedButton from "@/src/components/themed/ThemedButton";

export interface Props {
    onSuccess: (result: ImagePickerSuccessResult) => void;
    onFailure: (error: Error) => void;
    onCanceled: () => void;
}


export default function CustomImagePicker({onSuccess, onFailure, onCanceled}: Props) {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images', 'videos'],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            });

            if (result.canceled) {
                onCanceled();
            } else {
                setImage(result.assets[0].uri);
                onSuccess(result);
            }
        } catch (error) {
            if (error instanceof Error) {
                onFailure(error);
            } else {
                onFailure(new Error('An unknown error occurred during image picking.'));
            }
        }
    };

    return (
        <View className="flex-1 items-center justify-center gap-4">
            <ThemedButton
                mode="contained"
                title="Bild auswählen"
                onPress={pickImage}
                icon="image"
            />
            {image && <ImageViewer imgSource={{uri: image}}/>}
        </View>
    );
}
