import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const JWT_TOKEN_KEY = "jwtToken";
export const THEME_KEY = "theme";

export const saveInStorage = async (key: string, value: string) => {
    if (isWeb) {
        localStorage.setItem(key, value); // Web: localStorage
    } else {
        await SecureStore.setItemAsync(key, value); // Mobile: SecureStore
    }
};

export const getFromStorage = async (key: string): Promise<string | null> => {
    if (isWeb) {
        const item = localStorage.getItem(key);
        console.log("Item:", item);
        return item; // Web: localStorage
    } else {
        const item = await SecureStore.getItemAsync(key);
        console.log("Item:", item);
        return item; // Mobile: SecureStore
    }
};

export const removeFromStorage = async (key: string) => {
    if (isWeb) {
        localStorage.removeItem(key); // Web: localStorage
    } else {
        await SecureStore.deleteItemAsync(key); // Mobile: SecureStore
    }
};
