import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {CustomMD3Theme, darkTheme, lightTheme} from '@/src/core/theme';

const getSystemThemeIsDark = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
};

const zustandStorage = {
    getItem: async (name: string): Promise<string | null> => {
        if (Platform.OS === 'web') {
            return localStorage.getItem(name);
        }
        return await SecureStore.getItemAsync(name);
    },
    setItem: async (name: string, value: string): Promise<void> => {
        if (Platform.OS === 'web') {
            localStorage.setItem(name, value);
        } else {
            await SecureStore.setItemAsync(name, value);
        }
    },
    removeItem: async (name: string): Promise<void> => {
        if (Platform.OS === 'web') {
            localStorage.removeItem(name);
        } else {
            await SecureStore.deleteItemAsync(name);
        }
    },
};

interface ThemeState {
    theme: CustomMD3Theme;
    isDark: boolean;
    isHydrated: boolean;
    toggleTheme: () => void;
    setHydrated: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => {
            const initialDark = getSystemThemeIsDark();

            return {
                theme: initialDark ? darkTheme : lightTheme,
                isDark: initialDark,
                isHydrated: false,
                toggleTheme: () => {
                    const newIsDark = !get().isDark;
                    set({
                        isDark: newIsDark,
                        theme: newIsDark ? darkTheme : lightTheme,
                    });
                },
                setHydrated: () => set({isHydrated: true}),
            };
        },
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => zustandStorage),
            partialize: (state) => ({isDark: state.isDark}),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.theme = state.isDark ? darkTheme : lightTheme;
                    state.setHydrated();
                }
            },
        }
    )
);

