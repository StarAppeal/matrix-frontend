import ThemedHeader from "@/src/components/themed/ThemedHeader";
import React, { useState } from "react";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import CustomImagePicker from "@/src/components/ImagePicker";
import { ImagePickerSuccessResult } from "expo-image-picker";
import { View, StyleSheet, Alert, FlatList, Text, ActivityIndicator, TouchableOpacity, Linking, Platform } from "react-native";
import { S3File, RestService } from "@/src/services/RestService";
import ThemedButton from "@/src/components/themed/ThemedButton";
import { useTheme } from "@/src/context/ThemeProvider";
import { useAuth } from "@/src/context/AuthProvider";
import { MaterialIcons } from '@expo/vector-icons';

export default function ImageScreen() {
    const { token } = useAuth();
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState<S3File[]>([]);
    const [showFiles, setShowFiles] = useState(false);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const { theme } = useTheme();

    const { primary, onSurface, outline, error } = theme.colors;

    const fetchStoredFiles = async () => {
        setLoadingFiles(true);
        try {
            const response = await new RestService(token).getStoredFiles();
            if (response.ok && response.data) {
                setFiles(response.data);
                setShowFiles(true);
            } else {
                Alert.alert("Fehler", "Dateien konnten nicht abgerufen werden");
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Dateien:", error);
            Alert.alert("Fehler", "Dateien konnten nicht abgerufen werden");
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

                const fileInfo = {
                    uri: selectedAsset.uri,
                    type: selectedAsset.mimeType || 'image/jpeg',
                    name: selectedAsset.fileName || 'upload.jpg'
                };

                // @ts-ignore
                formData.append('image', fileInfo);

                const response = await new RestService(token).uploadFile(formData);

                if (response.ok) {
                    Alert.alert("Erfolg", "Datei erfolgreich hochgeladen");
                    fetchStoredFiles();
                } else {
                    Alert.alert("Fehler", "Upload fehlgeschlagen");
                }
            } catch (error) {
                console.error("Fehler beim Hochladen der Datei:", error);
                Alert.alert("Fehler", "Upload fehlgeschlagen");
            } finally {
                setUploading(false);
            }
        }
    };

    const onFailure = (error: Error) => {
        console.error("Error picking image", error);
        Alert.alert("Fehler", "Bildauswahl fehlgeschlagen");
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

    const viewFile = async (objectKey: string, fileName: string, mimeType: string) => {
        try {
            const response = await new RestService(token).getFileUrl(objectKey);
            if (response.ok && response.data.url) {
                const url = response.data.url;

                const canOpen = await Linking.canOpenURL(url);
                if (canOpen) {
                    await Linking.openURL(url);
                } else {
                    Alert.alert("Fehler", "Diese URL kann nicht geöffnet werden");
                }
            } else {
                Alert.alert("Fehler", "Datei-URL konnte nicht abgerufen werden");
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Datei-URL:", error);
            Alert.alert("Fehler", "Datei-URL konnte nicht abgerufen werden");
        }
    };

    const deleteFile = async (objectKey: string) => {
        Alert.alert(
            "Datei löschen",
            "Möchtest du diese Datei wirklich löschen?",
            [
                {
                    text: "Abbrechen",
                    style: "cancel"
                },
                {
                    text: "Löschen",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const response = await new RestService(token).deleteFile(objectKey);
                            if (response.ok) {
                                Alert.alert("Erfolg", "Datei erfolgreich gelöscht");
                                // Liste aktualisieren
                                fetchStoredFiles();
                            } else {
                                Alert.alert("Fehler", "Datei konnte nicht gelöscht werden");
                            }
                        } catch (error) {
                            console.error("Fehler beim Löschen der Datei:", error);
                            Alert.alert("Fehler", "Datei konnte nicht gelöscht werden");
                        }
                    }
                }
            ]
        );
    };

    return (
        <ThemedBackground>
            <ThemedHeader>
                Bildschirm für Bildauswahl
            </ThemedHeader>

            <View style={styles.container}>
                {uploading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={primary} />
                        <Text style={[styles.loadingText, { color: onSurface }]}>
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

                <View style={styles.buttonContainer}>
                    <ThemedButton
                        onPress={toggleFilesList}
                        title={showFiles ? "Dateien ausblenden" : "Gespeicherte Dateien anzeigen"}
                        mode="contained"
                    />
                </View>

                {showFiles && (
                    <View style={styles.filesList}>
                        <ThemedHeader>Gespeicherte Dateien</ThemedHeader>

                        {loadingFiles ? (
                            <ActivityIndicator size="large" color={primary} />
                        ) : files.length > 0 ? (
                            <FlatList
                                data={files}
                                keyExtractor={(item) => item.key}
                                renderItem={({ item }) => (
                                    <View style={[styles.fileItem, { borderColor: outline }]}>
                                        <Text style={{ color: onSurface, fontWeight: 'bold' }}>
                                            {item.originalName}
                                        </Text>
                                        <Text style={{ color: onSurface }}>
                                            Typ: {item.mimeType}
                                        </Text>
                                        <Text style={{ color: onSurface }}>
                                            Größe: {formatFileSize(item.size)}
                                        </Text>
                                        <Text style={{ color: onSurface }}>
                                            Zuletzt geändert: {formatDate(item.lastModified)}
                                        </Text>
                                        <View style={styles.fileItemButtons}>
                                            <TouchableOpacity
                                                style={[styles.fileButton, { backgroundColor: primary }]}
                                                onPress={() => viewFile(item.key, item.originalName, item.mimeType)}
                                            >
                                                <MaterialIcons name="visibility" size={24} color="white" />
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.fileButton, { backgroundColor: error }]}
                                                onPress={() => deleteFile(item.key)}
                                            >
                                                <MaterialIcons name="delete" size={24} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                        ) : (
                            <Text style={{ color: onSurface, textAlign: 'center' }}>
                                Keine Dateien gefunden
                            </Text>
                        )}
                    </View>
                )}
            </View>
        </ThemedBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    buttonContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    filesList: {
        flex: 1,
        width: '100%',
    },
    fileItem: {
        padding: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
        position: 'relative',
    },
    fileItemButtons: {
        flexDirection: 'row',
        position: 'absolute',
        top: 12,
        right: 12,
    },
    fileButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    }
});
