import React, {useState} from "react";
import {View, ActivityIndicator, FlatList, Text, TouchableOpacity, Linking, Modal} from "react-native";
import {ImagePickerSuccessResult} from "expo-image-picker";
import {MaterialIcons, Feather} from '@expo/vector-icons';
import {S3File, restService} from "@/src/services/RestService";
import {useColors} from "@/src/hooks/useColors";
import {useMatrixStore} from "@/src/stores";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import CustomImagePicker from "@/src/components/ImagePicker";
import ThemedButton from "@/src/components/themed/ThemedButton";
import SaveToMatrixButton from "@/src/components/SaveToMatrixButton";
import MatrixPreview from "@/src/components/MatrixPreview";

export default function ImageScreen() {
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState<S3File[]>([]);
    const [showFiles, setShowFiles] = useState(false);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [deletingFile, setDeletingFile] = useState<string | null>(null);
    const {colors} = useColors();

    const updateImageConfig = useMatrixStore((s) => s.updateImageConfig);

    const fetchStoredFiles = async () => {
        setLoadingFiles(true);
        try {
            const response = await restService.getStoredFiles();
            if (response.ok && response.data) {
                setFiles(response.data);
                setShowFiles(true);
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
            try {
                setUploading(true);
                const formData = new FormData();
                const fileBlob = ('file' in selectedAsset && selectedAsset.file) ?
                    selectedAsset.file as Blob :
                    await fetch(selectedAsset.uri).then(r => r.blob());

                const fileName = selectedAsset.fileName || 'upload.jpg';
                formData.append('image', fileBlob, fileName);

                const response = await restService.uploadFile(formData);
                if (response.ok) {
                    fetchStoredFiles();
                }
            } catch (error) {
                console.error("Fehler beim Hochladen:", error);
            } finally {
                setUploading(false);
            }
        }
    };

    const selectImageForMatrix = async (objectKey: string) => {
        try {
            const response = await restService.getFileUrl(objectKey);
            if (response.ok && response.data.url) {
                updateImageConfig({image_url: response.data.url});
            }
        } catch (error) {
            console.error("Fehler beim Setzen des Bildes:", error);
        }
    };

    const viewFile = async (objectKey: string) => {
        try {
            const response = await restService.getFileUrl(objectKey);
            if (response.ok && response.data.url && await Linking.canOpenURL(response.data.url)) {
                await Linking.openURL(response.data.url);
            }
        } catch (error) {
            console.error("Fehler beim Anzeigen:", error);
        }
    };

    const deleteFile = async (objectKey: string) => {
        const response = await restService.deleteFile(objectKey);
        if (response.ok) fetchStoredFiles();
    };

    return (
        <ThemedBackground>
            <View className="flex-1">
                <ThemedHeader subtitle="Lade Bilder hoch und zeige sie an">
                    Bilder Modus
                </ThemedHeader>

                <FlatList
                    className="flex-1 px-4"
                    contentContainerStyle={{paddingBottom: 100}}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            <MatrixPreview mode="image"/>

                            {uploading ? (
                                <View
                                    className="justify-center items-center bg-surface dark:bg-surface-dark rounded-2xl p-8 mt-4 border border-outline/10">
                                    <ActivityIndicator size="large" color={colors.primary}/>
                                    <Text
                                        className="mt-4 text-base font-medium text-onSurface dark:text-onSurface-dark">
                                        Datei wird hochgeladen...
                                    </Text>
                                </View>
                            ) : (
                                <View
                                    className="bg-surface dark:bg-surface-dark rounded-2xl p-5 mt-4 border border-outline/10 shadow-sm">
                                    <CustomImagePicker
                                        onSuccess={onSuccess}
                                        onFailure={(e) => console.error(e)}
                                        onCanceled={() => console.log("Canceled")}
                                    />
                                </View>
                            )}

                            <View className="my-4">
                                <ThemedButton
                                    onPress={() => !showFiles ? fetchStoredFiles() : setShowFiles(false)}
                                    title={showFiles ? "Dateien ausblenden" : "Gespeicherte Dateien anzeigen"}
                                    mode={showFiles ? "outlined" : "contained"}
                                    icon={showFiles ? "eye-off" : "folder"}
                                />
                            </View>

                            {showFiles &&
                                <Text className="text-base font-semibold text-onSurface dark:text-onSurface-dark mb-3">Gespeicherte
                                    Dateien</Text>}
                            {showFiles && loadingFiles &&
                                <ActivityIndicator size="large" color={colors.primary} className="py-8"/>}
                        </>
                    }
                    data={showFiles && !loadingFiles ? files : []}
                    keyExtractor={(item) => item.key}
                    ListEmptyComponent={
                        showFiles && !loadingFiles ? (
                            <View className="items-center py-8 bg-surface dark:bg-surface-dark rounded-2xl">
                                <Text className="text-muted dark:text-muted-dark">Keine Dateien gefunden</Text>
                            </View>
                        ) : null
                    }
                    renderItem={({item}) => (
                        <View
                            className="p-4 my-1.5 rounded-xl bg-surface dark:bg-surface-dark border border-outline/30 shadow-sm">
                            <View className="pr-24">
                                <Text className="font-semibold text-onSurface dark:text-onSurface-dark mb-1"
                                      numberOfLines={1}>
                                    {item.originalName}
                                </Text>
                                <Text className="text-xs text-muted dark:text-muted-dark">
                                    {(item.size / 1024).toFixed(1)} KB
                                    • {new Date(item.lastModified).toLocaleDateString('de-DE')}
                                </Text>
                            </View>

                            <View className="flex-row absolute top-3 right-3 gap-2">
                                <TouchableOpacity
                                    className="w-10 h-10 rounded-xl justify-center items-center bg-green-500"
                                    onPress={() => selectImageForMatrix(item.key)}
                                >
                                    <Feather name="check" size={22} color="white"/>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="w-10 h-10 rounded-xl justify-center items-center bg-primary"
                                    onPress={() => viewFile(item.key)}
                                >
                                    <MaterialIcons name="visibility" size={22} color="white"/>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="w-10 h-10 rounded-xl justify-center items-center bg-error"
                                    onPress={() => setDeletingFile(item.key)}
                                >
                                    <MaterialIcons name="delete" size={22} color="white"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />

                <View className="absolute bottom-4 left-4 right-4 bg-background dark:bg-background-dark pt-2">
                    <SaveToMatrixButton mode="image"/>
                </View>

                <Modal animationType="fade" transparent={true} visible={!!deletingFile}
                       onRequestClose={() => setDeletingFile(null)}>
                    <View className="flex-1 justify-center items-center bg-black/60 px-6">
                        <View className="w-full max-w-sm bg-surface dark:bg-surface-dark rounded-2xl p-6">
                            <Text
                                className="text-lg font-semibold text-center text-onSurface dark:text-onSurface-dark mb-2">Datei
                                löschen?</Text>
                            <Text className="text-sm text-center text-muted dark:text-muted-dark mb-6">Diese Aktion kann
                                nicht rückgängig gemacht werden.</Text>
                            <View className="gap-2">
                                <ThemedButton onPress={() => {
                                    if (deletingFile) {
                                        deleteFile(deletingFile);
                                        setDeletingFile(null);
                                    }
                                }} title="Ja, löschen" mode="contained" className="bg-error"/>
                                <ThemedButton onPress={() => setDeletingFile(null)} title="Abbrechen" mode="outlined"/>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ThemedBackground>
    );
}