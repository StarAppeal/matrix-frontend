import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const JWT_TOKEN_KEY = "jwtToken";
export const THEME_KEY = "theme";

export const saveInStorage = async (key: string, value: string) => {
    if (isWeb && key === JWT_TOKEN_KEY) {
        return;
    }
    if (isWeb) {
        localStorage.setItem(key, value);
    } else {
        await SecureStore.setItemAsync(key, value);
    }
};


export const getFromStorage = async (key: string): Promise<string | null> => {
    if (isWeb && key === JWT_TOKEN_KEY) {
        return null;
    }
    if (isWeb) {
        return localStorage.getItem(key);
    } else {
        return await SecureStore.getItemAsync(key);
    }
}

export const removeFromStorage = async (key: string) => {
    if (isWeb && key === JWT_TOKEN_KEY) {
        return;
    }
    if (isWeb) {
        localStorage.removeItem(key); // Web: localStorage
    } else {
        await SecureStore.deleteItemAsync(key); // Mobile: SecureStore
    }
};
