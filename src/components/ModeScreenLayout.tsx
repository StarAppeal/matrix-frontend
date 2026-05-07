import React, { ReactNode } from "react";
import { View, Text, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import ThemedHeader from "@/src/components/themed/ThemedHeader";
import SaveToMatrixButton from "@/src/components/SaveToMatrixButton";
import MatrixPreview, { AdditionalInitialPayload } from "@/src/components/MatrixPreview";
import { useColors } from "@/src/hooks/useColors";
import { MatrixState } from "@/src/model/User";

interface ModeScreenLayoutProps {
    mode: MatrixState['global']['mode'];
    title: string;
    subtitle: string;
    icon: keyof typeof Feather.glyphMap;
    additionalPayload?: AdditionalInitialPayload[];
    hidePreview?: boolean;
    disableSave?: boolean;
    warningText?: string;
    settingsTitle?: string;
    settingsDescription?: string;
    children?: ReactNode;
}

export default function ModeScreenLayout({
    mode,
    title,
    subtitle,
    icon,
    additionalPayload,
    hidePreview = false,
    disableSave = false,
    warningText,
    settingsTitle = "Einstellungen",
    settingsDescription,
    children
}: ModeScreenLayoutProps) {
    const { colors } = useColors();

    return (
        <ThemedBackground>
            <View className="flex-1 w-full items-center">

                <View className="w-full max-w-4xl px-4 pt-4">
                    <ThemedHeader centered subtitle={subtitle}>
                        {title}
                    </ThemedHeader>
                </View>

                <ScrollView
                    className="flex-1 w-full"
                    contentContainerStyle={{ paddingBottom: 100, alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="w-full max-w-xl md:max-w-4xl px-4 flex-col md:flex-row md:items-center md:justify-center gap-6 mt-4">

                        {!hidePreview && (
                            <View className="w-full md:w-[45%] items-center">
                                <MatrixPreview mode={mode} additionalPayload={additionalPayload} />
                            </View>
                        )}

                        <View className={`w-full ${hidePreview ? 'md:w-[60%]' : 'md:w-[55%]'}`}>
                            {children && (
                                <View className="bg-surface dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-outline/10 gap-6">
                                    <View className="items-center mb-2">
                                        <View className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-light/10 items-center justify-center mb-3">
                                            <Feather name={icon} size={32} color={colors.primary} />
                                        </View>
                                        <Text className="text-base font-medium text-onSurface dark:text-onSurface-dark text-center">
                                            {settingsTitle}
                                        </Text>
                                        {settingsDescription && (
                                            <Text className="text-xs text-muted dark:text-muted-dark text-center mt-1">
                                                {settingsDescription}
                                            </Text>
                                        )}
                                        {warningText && (
                                            <Text className="text-sm text-error dark:text-error-dark text-center mt-2">
                                                {warningText}
                                            </Text>
                                        )}
                                    </View>

                                    {children}
                                </View>
                            )}
                        </View>

                    </View>
                </ScrollView>

                <View className="absolute bottom-4 left-0 right-0 items-center pointer-events-none">
                    <View className="w-full max-w-xl px-4 pointer-events-auto">
                        <SaveToMatrixButton mode={mode} disabled={disableSave} />
                    </View>
                </View>

            </View>
        </ThemedBackground>
    );
}