import ThemedHeader from "@/src/components/themed/ThemedHeader";
import React from "react";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import CustomImagePicker from "@/src/components/ImagePicker";
import {ImagePickerSuccessResult} from "expo-image-picker";

export default function ImageScreen() {
    const onSuccess = (result: ImagePickerSuccessResult) => {
        console.log("Image picked successfully", result);
    }
    const onFailure = (error: Error) => {
        console.error("Error picking image", error);
    }

    const onCanceled = () => {
        console.log("Image picking canceled");
    }

    return (
        <ThemedBackground>
            <ThemedHeader>
                Bildschirm für Bildauswahl
            </ThemedHeader>
            <CustomImagePicker onSuccess={onSuccess} onFailure={onFailure} onCanceled={onCanceled}/>
        </ThemedBackground>
    );
}
