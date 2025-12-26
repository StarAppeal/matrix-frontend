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

export default function ImageScreen() {
    const {token} = useAuth();
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState<S3File[]>([]);
    const [showFiles, setShowFiles] = useState(false);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [deletingFile, setDeletingFile] = useState<string | null>(null);
    const {colors} = useColors();

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
            <ThemedHeader>
                Bildschirm für Bildauswahl
            </ThemedHeader>

            <View className="flex-1 w-full p-4">
                {uploading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color={colors.primary}/>
                        <Text className="mt-2.5 text-base text-onSurface dark:text-onSurface-dark">
                            Datei wird hochgeladen...
                        </Text>
                    </View>
                ) : (
                    <CustomImagePicker
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        onCanceled={onCanceled}
                    />
                )}

                <View className="my-5 items-center">
                    <ThemedButton
                        onPress={toggleFilesList}
                        title={showFiles ? "Dateien ausblenden" : "Gespeicherte Dateien anzeigen"}
                        mode="contained"
                    />
                </View>

                {showFiles && (
                    <View className="flex-1 w-full">
                        <ThemedHeader>Gespeicherte Dateien</ThemedHeader>

                        {loadingFiles ? (
                            <ActivityIndicator size="large" color={colors.primary}/>
                        ) : files.length > 0 ? (
                            <FlatList
                                data={files}
                                keyExtractor={(item) => item.key}
                                renderItem={({item}) => (
                                    <View
                                        className="p-3 my-2 border rounded-lg relative border-outline dark:border-outline-dark"
                                    >
                                        <Text className="font-bold text-onSurface dark:text-onSurface-dark">
                                            {item.originalName}
                                        </Text>
                                        <Text className="text-onSurface dark:text-onSurface-dark">
                                            Typ: {item.mimeType}
                                        </Text>
                                        <Text className="text-onSurface dark:text-onSurface-dark">
                                            Größe: {formatFileSize(item.size)}
                                        </Text>
                                        <Text className="text-onSurface dark:text-onSurface-dark">
                                            Zuletzt geändert: {formatDate(item.lastModified)}
                                        </Text>
                                        <View className="flex-row absolute top-3 right-3">
                                            <TouchableOpacity
                                                className="w-9 h-9 rounded-full justify-center items-center ml-2 bg-primary"
                                                onPress={() => viewFile(item.key)}
                                            >
                                                <MaterialIcons name="visibility" size={24} color="white"/>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                className="w-9 h-9 rounded-full justify-center items-center ml-2 bg-error"
                                                onPress={() => confirmDeleteFile(item.key)}
                                            >
                                                <MaterialIcons name="delete" size={24} color="white"/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                        ) : (
                            <Text className="text-center text-onSurface dark:text-onSurface-dark">
                                Keine Dateien gefunden
                            </Text>
                        )}
                    </View>
                )}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!deletingFile}
                    onRequestClose={cancelDelete}
                >
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="w-4/5 bg-surface dark:bg-surface-dark rounded-lg p-5 items-center">
                            <Text className="mb-4 text-center text-onSurface dark:text-onSurface-dark">
                                Sind Sie sicher, dass Sie diese Datei löschen möchten?
                            </Text>
                            <View className="flex-row justify-between w-full">
                                <ThemedButton
                                    onPress={() => {
                                        if (deletingFile) {
                                            deleteFile(deletingFile);
                                            setDeletingFile(null);
                                        }
                                    }}
                                    title="Ja, löschen"
                                    mode="contained"
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
            </View>
        </ThemedBackground>
    );
}

