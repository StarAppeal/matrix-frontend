import ThemedHeader from "@/src/components/themed/ThemedHeader";
import React, {useState} from "react";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import CustomImagePicker from "@/src/components/ImagePicker";
import {ImagePickerSuccessResult} from "expo-image-picker";
import {
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    Linking,
    Modal,
} from "react-native";
import {S3File, RestService} from "@/src/services/RestService";
import ThemedButton from "@/src/components/themed/ThemedButton";
import {useColors} from "@/src/hooks/useColors";
import {useAuth} from "@/src/stores/authStore";
import {MaterialIcons} from '@expo/vector-icons';
import { useMatrixStore } from "@/src/stores";
import SaveToMatrixButton from "@/src/components/SaveToMatrixButton";

export default function ImageScreen() {
    const {token} = useAuth();
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState<S3File[]>([]);
    const [showFiles, setShowFiles] = useState(false);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [deletingFile, setDeletingFile] = useState<string | null>(null);
    const {colors} = useColors();

    const imageConfig = useMatrixStore((s) => s.matrixState.image);
    const updateImageConfig = useMatrixStore((s) => s.updateImageConfig);

    const fetchStoredFiles = async () => {
        setLoadingFiles(true);
        try {
            const response = await new RestService(token).getStoredFiles();
            if (response.ok && response.data) {
                setFiles(response.data);
                setShowFiles(true);
            } else {
                console.error("Fehler beim Abrufen der Dateien");
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Dateien:", error);
        } finally {
            setLoadingFiles(false);
        }
    };

    const onSuccess = async (result: ImagePickerSuccessResult) => {
        if (result.assets && result.assets.length > 0) {
            const selectedAsset = result.assets[0];
            console.log("Image picked successfully", selectedAsset);

            try {
                setUploading(true);

                const formData = new FormData();

                const fileBlob = ('file' in selectedAsset && selectedAsset.file) ?
                    selectedAsset.file as Blob :
                    await fetch(selectedAsset.uri).then(r => r.blob());

                const fileName = selectedAsset.fileName || 'upload.jpg';

                formData.append('image', fileBlob, fileName);
                console.log("Web-Plattform: Blob angehängt mit Namen:", fileName);

                const response = await new RestService(token).uploadFile(formData);

                if (response.ok) {
                    console.log("Datei erfolgreich hochgeladen");
                    fetchStoredFiles();
                } else {
                    console.error("Upload fehlgeschlagen:", response);
                }
            } catch (error) {
                console.error("Fehler beim Hochladen der Datei:", error);
            } finally {
                setUploading(false);
            }
        }
    };

    const onFailure = (error: Error) => {
        console.error("Error picking image", error);
    };

    const onCanceled = () => {
        console.log("Image picking canceled");
    };

    const toggleFilesList = () => {
        if (!showFiles) {
            fetchStoredFiles();
        } else {
            setShowFiles(false);
        }
    };

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        return date.toLocaleString('de-DE');
    };

    const formatFileSize = (size: number) => {
        if (size < 1024) {
            return `${size} B`;
        } else if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(2)} KB`;
        } else {
            return `${(size / (1024 * 1024)).toFixed(2)} MB`;
        }
    };

    const viewFile = async (objectKey: string) => {
        try {
            const response = await new RestService(token).getFileUrl(objectKey);
            if (response.ok && response.data.url) {
                const url = response.data.url;

                const canOpen = await Linking.canOpenURL(url);
                if (canOpen) {
                    await Linking.openURL(url);
                } else {
                    console.error("Diese URL kann nicht geöffnet werden:", url);
                }
            } else {
                console.error("Datei-URL konnte nicht abgerufen werden");
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Datei-URL:", error);
        }
    };

    const deleteFile = async (objectKey: string) => {
        try {
            const response = await new RestService(token).deleteFile(objectKey);
            if (response.ok) {
                console.log("Datei erfolgreich gelöscht");
                fetchStoredFiles();
            } else {
                console.error("Datei konnte nicht gelöscht werden");
            }
        } catch (error) {
            console.error("Fehler beim Löschen der Datei:", error);
        }
    };

    const confirmDeleteFile = (objectKey: string) => {
        setDeletingFile(objectKey);
    };

    const cancelDelete = () => {
        setDeletingFile(null);
    };

    return (
        <ThemedBackground>
            <ThemedHeader subtitle="Lade Bilder hoch und zeige sie an">
                Bilder Modus
            </ThemedHeader>

            <View className="flex-1 w-full">
                {uploading ? (
                    <View className="flex-1 justify-center items-center bg-surface dark:bg-surface-dark rounded-2xl p-8">
                        <ActivityIndicator size="large" color={colors.primary}/>
                        <Text className="mt-4 text-base font-medium text-onSurface dark:text-onSurface-dark">
                            Datei wird hochgeladen...
                        </Text>
                    </View>
                ) : (
                    <View className="bg-surface dark:bg-surface-dark rounded-2xl p-5">
                        <CustomImagePicker
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            onCanceled={onCanceled}
                        />
                    </View>
                )}

                <View className="my-4">
                    <ThemedButton
                        onPress={toggleFilesList}
                        title={showFiles ? "Dateien ausblenden" : "Gespeicherte Dateien anzeigen"}
                        mode={showFiles ? "outlined" : "contained"}
                        icon={showFiles ? "eye-off" : "folder"}
                    />
                </View>

                {showFiles && (
                    <View className="flex-1 w-full">
                        <Text className="text-base font-semibold text-onSurface dark:text-onSurface-dark mb-3">
                            Gespeicherte Dateien
                        </Text>

                        {loadingFiles ? (
                            <View className="items-center py-8">
                                <ActivityIndicator size="large" color={colors.primary}/>
                            </View>
                        ) : files.length > 0 ? (
                            <FlatList
                                data={files}
                                keyExtractor={(item) => item.key}
                                renderItem={({item}) => (
                                    <View className="p-4 my-1.5 rounded-xl relative bg-surface dark:bg-surface-dark border border-outline/30 dark:border-outline-dark/30">
                                        <Text className="font-semibold text-onSurface dark:text-onSurface-dark mb-1">
                                            {item.originalName}
                                        </Text>
                                        <Text className="text-sm text-muted dark:text-muted-dark">
                                            {item.mimeType} • {formatFileSize(item.size)}
                                        </Text>
                                        <Text className="text-xs text-muted dark:text-muted-dark mt-1">
                                            {formatDate(item.lastModified)}
                                        </Text>
                                        <View className="flex-row absolute top-3 right-3 gap-2">
                                            <TouchableOpacity
                                                className="w-10 h-10 rounded-xl justify-center items-center bg-primary"
                                                onPress={() => viewFile(item.key)}
                                            >
                                                <MaterialIcons name="visibility" size={22} color="white"/>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                className="w-10 h-10 rounded-xl justify-center items-center bg-error"
                                                onPress={() => confirmDeleteFile(item.key)}
                                            >
                                                <MaterialIcons name="delete" size={22} color="white"/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                        ) : (
                            <View className="items-center py-8 bg-surface dark:bg-surface-dark rounded-2xl">
                                <Text className="text-muted dark:text-muted-dark">
                                    Keine Dateien gefunden
                                </Text>
                            </View>
                        )}
                    </View>
                )}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={!!deletingFile}
                    onRequestClose={cancelDelete}
                >
                    <View className="flex-1 justify-center items-center bg-black/60 px-6">
                        <View className="w-full max-w-sm bg-surface dark:bg-surface-dark rounded-2xl p-6">
                            <Text className="text-lg font-semibold text-center text-onSurface dark:text-onSurface-dark mb-2">
                                Datei löschen?
                            </Text>
                            <Text className="text-sm text-center text-muted dark:text-muted-dark mb-6">
                                Diese Aktion kann nicht rückgängig gemacht werden.
                            </Text>
                            <View className="gap-2">
                                <ThemedButton
                                    onPress={() => {
                                        if (deletingFile) {
                                            deleteFile(deletingFile);
                                            setDeletingFile(null);
                                        }
                                    }}
                                    title="Ja, löschen"
                                    mode="contained"
                                    className="bg-error"
                                />
                                <ThemedButton
                                    onPress={cancelDelete}
                                    title="Abbrechen"
                                    mode="outlined"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

                {imageConfig.image && (
                    <View className="mt-4">
                        <Text className="text-sm text-muted dark:text-muted-dark mb-2">
                            Ausgewähltes Bild: {imageConfig.image}
                        </Text>
                    </View>
                )}
            </View>
        </ThemedBackground>
    );

    // add  <SaveToMatrixButton mode="image" /> back after the text block
}

