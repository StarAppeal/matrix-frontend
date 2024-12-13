import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from "@/src/components/ImageViewer";
import {ImagePickerSuccessResult} from "expo-image-picker/src/ImagePicker.types";

export interface Props {
    onSuccess: (result: ImagePickerSuccessResult) => void;
    onFailure: (error: Error) => void;
    onCanceled: () => void;
}


export default function CustomImagePicker({onSuccess, onFailure, onCanceled}: Props) {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        }).then((result) => {
            if (result.canceled) {
                onCanceled();
            } else {
                setImage(result.assets[0].uri);
                onSuccess(result);
            }
        }).catch((error) => {
            onFailure(error);
        });
        console.log(result);
    }

    return (
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" onPress={pickImage}/>
            {image && <ImageViewer imgSource={{uri: image}}/>}
        </View>);
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});
