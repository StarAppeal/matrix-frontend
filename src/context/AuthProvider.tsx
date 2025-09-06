import React, {createContext, useContext, useEffect, useState} from "react";
import {getFromStorage, JWT_TOKEN_KEY, removeFromStorage, saveInStorage} from "@/src/utils/secureStorage";
import {RestService} from "@/src/services/RestService";
import {User} from "@/src/model/User";


type AuthContextType = {
    isAuthenticated: boolean | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    authenticatedUser: User | null;
    error: string | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const storedToken = await getFromStorage(JWT_TOKEN_KEY);
            if (storedToken) {
                setToken(storedToken);
                const user = await saveUser(storedToken);
                setIsAuthenticated(!!user);
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        checkAuthStatus();
    }, []);

    const saveUser = async (token: string): Promise<User | null> => {
        const response = await new RestService(token).getSelf();
        if (!response.ok || !response.data) {
            // token ist ungültig
            await removeFromStorage(JWT_TOKEN_KEY);
            setToken(null);
            setIsAuthenticated(false);
            setAuthenticatedUser(null);
            setError("Token invalid");
            return null;
        }
        const user = response.data;
        setAuthenticatedUser(user);
        return user;
    }

    const login = async (username: string, password: string) => {
        if (isAuthenticated) {
            console.log("Already authenticated");
            return;
        }
        const response = await new RestService(null).login(username, password);
        if (!response.ok) {
            console.error("Login failed:", response.data.message);
            setError(response.data.message!);
            setIsAuthenticated(false);
            return;
        }
        const token = response.data.token!;
        await saveInStorage(JWT_TOKEN_KEY, token);
        setToken(token);
        // Fehler zurücksetzen
        setError(null);
        // User laden und ERST DANN isAuthenticated setzen
        const user = await saveUser(token);
        setIsAuthenticated(!!user);
        setLoading(false);
    };

    const logout = async () => {
        await removeFromStorage(JWT_TOKEN_KEY);
        setToken(null);
        setIsAuthenticated(false);
        setAuthenticatedUser(null);
    };

    const refreshUser = async () => {
        console.log("refreshUser")
        console.log(token)
        if (!token) return;
        await saveUser(token);
    };

    return (
        <AuthContext.Provider
            value={{isAuthenticated, token, login, logout, error, authenticatedUser, loading, refreshUser}}>
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
}