import React, {createContext, useContext, useEffect, useState} from "react";
import {getFromStorage, JWT_TOKEN_KEY, removeFromStorage, saveInStorage} from "@/src/utils/secureStorage";
import {RestService} from "@/src/services/RestService";

type AuthContextType = {
    isAuthenticated: boolean | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    error: { message: string; id: "username" | "password" } | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<{ message: string; id: "username" | "password" } | null>(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const storedToken = await getFromStorage(JWT_TOKEN_KEY);
            if (storedToken) {
                setToken(storedToken);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (username: string, password: string) => {
        if (isAuthenticated) {
            console.log("Already authenticated");
            return;
        }
        const response = await RestService.login(username, password);
        if (!response.success) {
            console.error("Login failed:", response.message);
            setError({
                message: response.message,
                id: response.id,
            });
            setIsAuthenticated(false);
            return;
        }
        await saveInStorage(JWT_TOKEN_KEY, response.token);
        setToken(response.token);
        setIsAuthenticated(true);
        // correctly logged in, reset error
        setError(null);
    };

    const logout = async () => {
        await removeFromStorage(JWT_TOKEN_KEY);
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, token, login, logout, error}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
