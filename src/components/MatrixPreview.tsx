import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ActivityIndicator, Image, Text, View, Pressable, Modal, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useMatrixStore } from '@/src/stores';
import { restService } from '@/src/services/RestService';

//TODO: remove fallback url
const PREVIEW_WS_URL = process.env.EXPO_PUBLIC_PREVIEW_WS_URL || 'ws://127.0.0.1:8765';

interface MatrixPreviewProps {
    mode: string;
}

export default function MatrixPreview({ mode }: MatrixPreviewProps) {
    const wsRef = useRef<WebSocket | null>(null);

    const [isConnected, setIsConnected] = useState(false);
    const [previewBase64, setPreviewFrame] = useState<string | null>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const matrixState = useMatrixStore((s) => s.matrixState);
    const setGlobalMode = useMatrixStore((s) => s.setGlobalMode);

    useEffect(() => {
        if (matrixState.global.mode !== mode) {
            setGlobalMode(mode as any);
        }
    }, [mode, matrixState.global.mode, setGlobalMode]);

    const stateRef = useRef(matrixState);
    useEffect(() => {
        stateRef.current = matrixState;
    }, [matrixState]);

    const sendStateUpdate = useCallback((ws: WebSocket, state: any) => {
        const payload = {
            type: "STATE",
            payload: {
                global: { ...state.global, mode: mode },
                [mode]: state[mode]
            }
        };
        ws.send(JSON.stringify(payload));
    }, [mode]);

    useEffect(() => {
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
                    ws?.send(JSON.stringify({ type: "AUTH", token: wsToken }));
                };

                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);

                        if (data.type === "AUTH_SUCCESS") {
                            setIsConnected(true);
                        }
                        else if (data.type === "PREVIEW_FRAME" && data.payload) {
                            setPreviewFrame(data.payload);
                        }
                        else if (data.type === "ERROR") {
                            console.error("[Preview] Sidecar service has error");
                        }
                    } catch (e) {
                        console.error("WS Parse Error:", e);
                    }
                };

                ws.onclose = () => {
                    if (isMounted) setIsConnected(false);
                };
            } catch (e) {
                console.error("[Preview] Error while connecting:", e);
            }
        };

        connect();

        return () => {
            isMounted = false;
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [sendStateUpdate]);

    useEffect(() => {
        if (isConnected && wsRef.current?.readyState === WebSocket.OPEN) {
            sendStateUpdate(wsRef.current, matrixState);
        }
    }, [matrixState, isConnected, sendStateUpdate]);

    return (
        <View className="items-center justify-center my-4">
            <Pressable
                onPress={() => previewBase64 && setIsFullScreen(true)}
                className="w-64 h-64 bg-[#0a0a0a] rounded-xl border-[3px] border-outline/20 dark:border-outline-dark/30 items-center justify-center shadow-2xl overflow-hidden relative"
                style={{ elevation: 10 }}
            >
                {!isConnected && !previewBase64 && (
                    <View className="items-center">
                        <ActivityIndicator size="large" color="#888" />
                        <Text className="text-gray-500 mt-3 text-xs font-medium uppercase tracking-widest">
                            Verbinde...
                        </Text>
                    </View>
                )}

                {previewBase64 && (
                    <>
                        <Image
                            source={{ uri: previewBase64 }}
                            className="w-full h-full"
                            resizeMode="stretch"
                        />
                        <View className="absolute bottom-2 right-2 bg-black/50 p-1.5 rounded-full">
                            <Feather name="maximize-2" size={16} color="rgba(255,255,255,0.7)" />
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
                        <Feather name="x" size={28} color="white" />
                    </TouchableOpacity>

                    <View className="w-[90vw] h-[90vw] max-w-lg max-h-lg bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        {previewBase64 && (
                            <Image
                                source={{ uri: previewBase64 }}
                                className="w-full h-full"
                                resizeMode="stretch"
                            />
                        )}
                    </View>

                    <Text className="text-white/50 mt-8 text-sm uppercase tracking-widest font-medium">
                        Live Vorschau
                    </Text>
                </View>
            </Modal>
        </View>
    );
}