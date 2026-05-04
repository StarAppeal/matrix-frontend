import React, {useEffect, useRef, useState, useCallback} from 'react';
import {ActivityIndicator, Image, Text, View, Pressable, Modal, TouchableOpacity, Platform} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useMatrixStore} from '@/src/stores';
import {restService} from '@/src/services/RestService';


import {useIsFocused} from '@react-navigation/native';

const PREVIEW_WS_URL = process.env.EXPO_PUBLIC_PREVIEW_WS_URL!;

export interface AdditionalInitialPayload {
    type: string;
    payload: any;
}

interface MatrixPreviewProps {
    mode: string;
    additionalPayload?: AdditionalInitialPayload[];
}

export default function MatrixPreview({mode, additionalPayload}: MatrixPreviewProps) {
    const wsRef = useRef<WebSocket | null>(null);
    const isFocused = useIsFocused();

    const latestFrameRef = useRef<string | null>(null);
    const renderScheduledRef = useRef(false);

    const [isConnected, setIsConnected] = useState(false);
    const [previewBase64, setPreviewFrame] = useState<string | null>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const getFullState = () => useMatrixStore.getState().matrixState;

    const sendStateUpdate = useCallback((ws: WebSocket) => {
        const fullState = getFullState();

        const statePayload = {
            type: "STATE",
            payload: {
                global: {...fullState.global, mode: mode},
                [mode]: fullState[mode as keyof typeof fullState]
            }
        };
        ws.send(JSON.stringify(statePayload));
    }, [mode]);

    useEffect(() => {
        if (!isFocused) {
            setIsConnected(false);
            setPreviewFrame(null);
            return;
        }

        let ws: WebSocket | null = null;
        let isMounted = true;

        const connect = async () => {
            try {
                const res = await restService.getSelfToken();
                if (!isMounted) return;

                const wsToken = res?.data?.token;
                if (!wsToken) return;

                ws = new WebSocket(PREVIEW_WS_URL);
                wsRef.current = ws;

                ws.onopen = () => {
                    ws?.send(JSON.stringify({type: "AUTH", token: wsToken}));
                };

                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);

                        if (data.type === "AUTH_SUCCESS") {
                            setIsConnected(true);
                            sendStateUpdate(ws!);
                            if (additionalPayload && additionalPayload.length > 0) {
                                additionalPayload.forEach(payload => ws?.send(JSON.stringify(payload)));
                            }
                        } else if (data.type === "PREVIEW_FRAME" && data.payload) {
                            latestFrameRef.current = data.payload;
                            if (!renderScheduledRef.current) {
                                renderScheduledRef.current = true;

                                requestAnimationFrame(() => {
                                    setPreviewFrame(latestFrameRef.current);
                                    renderScheduledRef.current = false;
                                });
                            }
                        }
                    } catch (e) {
                        console.error("WS Parse Error:", e);
                    }
                };

                ws.onclose = () => {
                    if (isMounted) setIsConnected(false);
                };
            } catch (e) {
                console.error("[Preview] Fehler beim Verbinden:", e);
            }
        };

        connect();

        return () => {
            isMounted = false;
            if (ws && ws.readyState === WebSocket.OPEN || ws?.readyState === WebSocket.CONNECTING) {
                ws.close();
            }
        };
    }, [sendStateUpdate, isFocused, additionalPayload]);

    const currentModeConfig = useMatrixStore((s) => s.matrixState[mode as keyof typeof s.matrixState]);

    const previousConfigRef = useRef(currentModeConfig);

    useEffect(() => {
        if (isConnected && wsRef.current?.readyState === WebSocket.OPEN) {
            if (previousConfigRef.current !== currentModeConfig) {
                sendStateUpdate(wsRef.current);
                previousConfigRef.current = currentModeConfig;
            }
        }
    }, [currentModeConfig, isConnected, sendStateUpdate]);

    return (
        <View className="items-center justify-center my-4 w-full">
            <Pressable
                onPress={() => previewBase64 && setIsFullScreen(true)}
                className="w-64 h-64 md:w-80 md:h-80 bg-black rounded-3xl border-[12px] border-[#2a2a2a] dark:border-[#1a1a1a] items-center justify-center overflow-hidden relative shadow-2xl"
                style={{
                    elevation: 15,
                }}
            >
                {!isConnected && !previewBase64 && (
                    <View className="items-center px-4">
                        <ActivityIndicator size="large" color="#888"/>
                        <Text className="text-gray-500 mt-4 text-center text-xs font-medium uppercase tracking-widest">
                            Verbinde...
                        </Text>
                    </View>
                )}

                {previewBase64 && (
                    <>
                        <Image
                            source={{uri: previewBase64}}
                            className="w-full h-full"
                            resizeMode="contain"
                            fadeDuration={0}
                            accessibilityIgnoresInvertColors
                            style={Platform.OS === 'web' ? { imageRendering: 'pixelated' } as any : {}}
                        />
                        <View className="absolute top-3 right-3 bg-black/40 p-2 rounded-full border border-white/5 opacity-50">
                            <Feather name="maximize-2" size={18} color="rgba(255,255,255,0.6)"/>
                        </View>
                    </>
                )}
            </Pressable>

            <Modal
                visible={isFullScreen}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsFullScreen(false)}
            >
                <View className="flex-1 bg-black/95 justify-center items-center">
                    <TouchableOpacity
                        onPress={() => setIsFullScreen(false)}
                        className="absolute top-12 right-6 bg-white/10 p-3 rounded-full z-10"
                    >
                        <Feather name="x" size={28} color="white"/>
                    </TouchableOpacity>

                    <View
                        className="w-full max-w-[80vw] max-h-[80vh] aspect-square bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        {previewBase64 && (
                            <Image
                                source={{uri: previewBase64}}
                                className="w-full h-full"
                                resizeMode="contain"
                                fadeDuration={0}
                                accessibilityIgnoresInvertColors
                                style={Platform.OS === 'web' ? { imageRendering: 'pixelated' } as any : {}}
                            />
                        )}
                    </View>

                    <Text className="text-white/50 mt-8 text-sm uppercase tracking-widest font-medium">
                        Live Vorschau (Fullscreen)
                    </Text>
                </View>
            </Modal>
        </View>
    );
}