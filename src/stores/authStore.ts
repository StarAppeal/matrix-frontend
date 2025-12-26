import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { User } from '@/src/model/User';
import { RestService } from '@/src/services/RestService';
import { useMatrixStore } from './matrixStore';

const authStorage = {
    getItem: async (name: string): Promise<string | null> => {
        if (Platform.OS === 'web') {
            return null;
        }
        return await SecureStore.getItemAsync(name);
    },
    setItem: async (name: string, value: string): Promise<void> => {
        if (Platform.OS === 'web') {
            return;
        }
        await SecureStore.setItemAsync(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
        if (Platform.OS === 'web') {
            return;
        }
        await SecureStore.deleteItemAsync(name);
    },
};

export interface AuthError {
    field: string;
    message: string;
}

interface AuthState {
    // State
    isAuthenticated: boolean | null;
    token: string | null;
    authenticatedUser: User | null;
    error: AuthError | null;
    loading: boolean;
    isHydrated: boolean;

    // Actions
    login: (username: string, password: string, stayLoggedIn?: boolean) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    setHydrated: () => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Initial State
            isAuthenticated: null,
            token: null,
            authenticatedUser: null,
            error: null,
            loading: true,
            isHydrated: false,

            // Actions
            setHydrated: () => set({ isHydrated: true }),

            clearError: () => set({ error: null }),

            checkAuthStatus: async () => {
                const state = get();
                try {
                    const token = Platform.OS === 'web' ? null : state.token;

                    if (Platform.OS !== 'web' && !token) {
                        set({ isAuthenticated: false, loading: false });
                        return;
                    }

                    const user = await fetchUserAndInitMatrix(token);
                    set({
                        isAuthenticated: !!user,
                        authenticatedUser: user,
                        loading: false,
                    });
                } catch {
                    set({
                        isAuthenticated: false,
                        token: null,
                        authenticatedUser: null,
                        loading: false,
                    });
                }
            },

            login: async (username: string, password: string, stayLoggedIn?: boolean) => {
                const state = get();
                if (state.isAuthenticated) {
                    console.log("Already authenticated");
                    return;
                }

                set({ loading: true, error: null });

                try {
                    const response = await new RestService(null).login(username, password, stayLoggedIn);

                    if (!response.ok) {
                        console.error("Login failed:", response.data);
                        const message = response.data.message!;
                        set({
                            error: { field: response.data.details?.field!, message },
                            isAuthenticated: false,
                            loading: false,
                        });
                        return;
                    }

                    let token: string | null = null;
                    if (Platform.OS !== 'web') {
                        token = response.data.token!;
                    }

                    const user = await fetchUserAndInitMatrix(token);

                    set({
                        token,
                        error: null,
                        isAuthenticated: !!user,
                        authenticatedUser: user,
                        loading: false,
                    });
                } catch {
                    set({
                        error: { field: 'general', message: 'Login failed' },
                        isAuthenticated: false,
                        loading: false,
                    });
                }
            },

            logout: async () => {
                try {
                    if (Platform.OS === 'web') {
                        await new RestService(null).logout();
                    }
                } finally {
                    useMatrixStore.getState().resetToDefaults();
                    set({
                        token: null,
                        isAuthenticated: false,
                        authenticatedUser: null,
                        error: null,
                    });
                }
            },

            refreshUser: async () => {
                const state = get();
                console.log("refreshUser");

                const token = Platform.OS === 'web' ? null : state.token;
                if (Platform.OS !== 'web' && !token) return;

                const user = await fetchUserAndInitMatrix(token);
                if (user) {
                    set({ authenticatedUser: user });
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => authStorage),
            partialize: (state) => ({ token: state.token }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setHydrated();
                    state.checkAuthStatus();
                }
            },
        }
    )
);

async function fetchUser(token: string | null): Promise<User | null> {
    const response = await new RestService(token).getSelf();
    if (!response.ok || !response.data) {
        return null;
    }
    return response.data;
}

async function fetchUserAndInitMatrix(token: string | null): Promise<User | null> {
    const user = await fetchUser(token);
    if (user?.lastState) {
        useMatrixStore.getState().initializeFromUser(user.lastState);
    }
    return user;
}

export const useAuth = useAuthStore;

