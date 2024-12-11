import React, {createContext, useContext, useEffect, useState} from "react";
import {getFromStorage, JWT_TOKEN_KEY, removeFromStorage, saveInStorage} from "@/src/utils/secureStorage";
import {RestService} from "@/src/services/RestService";
import {User} from "@/src/model/User";

interface AuthError {
    message: string;
    id: "username" | "password" | "general";
}

type AuthContextType = {
    isAuthenticated: boolean | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    error: AuthError | null;
    authenticatedUser: User | null;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<AuthError | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const storedToken = await getFromStorage(JWT_TOKEN_KEY);
            if (storedToken) {
                setToken(storedToken);
                setIsAuthenticated(true);
                await saveUser(storedToken);
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        checkAuthStatus();
    }, []);

    const saveUser = async (token: string) => {
        const user = await new RestService(token).getSelf();
        if (!user) {
            // token is invalid
            await removeFromStorage(JWT_TOKEN_KEY);
            setToken(null);
            setIsAuthenticated(false);
            setError({
                message: "Token invalid",
                id: "general",
            });
            return;
        }
        setAuthenticatedUser(user);
    }

    const login = async (username: string, password: string) => {
        if (isAuthenticated) {
            console.log("Already authenticated");
            return;
        }
        const response = await new RestService(null).login(username, password);
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
        await saveUser(response.token)
        // needed?
        setLoading(false);
    };

    const logout = async () => {
        await removeFromStorage(JWT_TOKEN_KEY);
        setToken(null);
        setIsAuthenticated(false);
        setAuthenticatedUser(null);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, token, login, logout, error, authenticatedUser, loading}}>
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
