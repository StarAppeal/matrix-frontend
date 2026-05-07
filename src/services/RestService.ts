import axios, {AxiosInstance, Method} from 'axios';
import {MatrixState, User} from "@/src/model/User";
import {Platform} from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface ApiResponse<T> {
    ok: boolean;
    data: T;
}

export interface S3File {
    key: string;
    lastModified: Date;
    originalName: string;
    mimeType: string;
    size: number;
}

export interface LocationResult {
    name: string;
    lat: number;
    lon: number;
    country?: string;
    state?: string;
    local_names?: Record<string, string>;
}

export interface TamagotchiResponse {
    hunger: number;
    happiness: number;
    energy: number;
    hygiene: number;
    status: string,
}

// Token provider function type - will be set from authStore
type TokenProvider = () => string | null;
let tokenProvider: TokenProvider = () => null;

export const setTokenProvider = (provider: TokenProvider) => {
    tokenProvider = provider;
};

class RestService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_URL,
            timeout: 10000, // Set a timeout for requests
            withCredentials: Platform.OS === 'web',
        });

        this.api.interceptors.request.use(
            (config) => {
                // Only use token for non-web platforms
                if (Platform.OS !== 'web') {
                    const token = tokenProvider();
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.api.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                // Only log non-connection errors to avoid spam when backend is down
                if (error.code !== 'ECONNREFUSED' && error.code !== 'ERR_NETWORK') {
                    console.error('Response Error:', error.response?.data || error.message);
                }
                return Promise.reject(error);
            }
        );
    }

    async fetchAllUser(): Promise<ApiResponse<{ users: User[] }>> {
        return this.request<ApiResponse<{ users: User[] }>>('GET', '/user');
    }

    async fetchUserById(id: string): Promise<ApiResponse<User>> {
        return this.request<ApiResponse<User>>('GET', `/user/${id}`);
    }

    async getSelf(): Promise<ApiResponse<User>> {
        return this.request<ApiResponse<User>>('GET', '/user/me');
    }

    async changeSelfPassword(password: string, passwordConfirmation: string): Promise<ApiResponse<{
        message: string
    }>> {
        return this.request<ApiResponse<{ message: string }>>(
            'PUT',
            '/user/me/password',
            {password, passwordConfirmation},
            {'Content-Type': 'application/json'}
        );
    }

    async updateLastState(lastState: MatrixState): Promise<ApiResponse<{ message: string }>> {
        return this.request<ApiResponse<{ message: string }>>(
            'PUT',
            '/user/me/state',
            {lastState},
            {'Content-Type': 'application/json'}
        );
    }

    async updateLastFmUsername(username: string): Promise<ApiResponse<User>> {
        return this.request<ApiResponse<User>>(
            'PUT',
            '/user/me/lastFmUsername',
            {username},
            {'Content-Type': 'application/json'}
        );
    }

    async removeLastFmUsername(): Promise<ApiResponse<User>> {
        return this.request(
            "DELETE",
            "/user/me/lastFmUsername",
        )
    }

    async sendPayloadToSocket(userId: string, payload: object): Promise<any> {
        return this.request(
            'POST',
            '/websocket/send-message',
            {users: [userId], payload},
            {'Content-Type': 'application/json'}
        );
    }

    async broadcast(payload: object): Promise<any> {
        return this.request(
            'POST',
            '/websocket/broadcast',
            {payload},
            {'Content-Type': 'application/json'}
        );
    }

    async login(username: string, password: string, stayLoggedIn?: boolean): Promise<ApiResponse<{
        message?: string, token?: string, details?: {
            field: string;
            code: string;
        }
    }>> {
        console.log("HALLO LOGIN OWO")
        return this.request<ApiResponse<{
            message?: string, token?: string, details?: {
                field: string;
                code: string;
            }
        }>>(
            "POST",
            '/auth/login',
            {username, password, stayLoggedIn},
            {'Content-Type': 'application/json'}
        );
    }

    async logout(): Promise<ApiResponse<{ message: string }>> {
        return this.request<ApiResponse<{ message: string }>>('POST', '/auth/logout');
    }

    async uploadFile(file: FormData): Promise<ApiResponse<{ message: string, objectKey: string }>> {
        return this.request<ApiResponse<{ message: string, objectKey: string }>>(
            'POST',
            '/storage/upload',
            file,
            {'Content-Type': 'multipart/form-data'}
        );
    }

    async getStoredFiles(): Promise<ApiResponse<S3File[]>> {
        return this.request<ApiResponse<S3File[]>>(
            'GET',
            '/storage/files'
        );
    }

    async getFileUrl(objectKey: string): Promise<ApiResponse<{ url: string }>> {
        return this.request<ApiResponse<{ url: string }>>(
            'GET',
            `/storage/files/${objectKey}/url`
        );
    }

    async deleteFile(objectKey: string): Promise<ApiResponse<{ message: string }>> {
        return this.request<ApiResponse<{ message: string }>>(
            'DELETE',
            `/storage/files/${objectKey}`
        );
    }

    async searchLocations(query: string): Promise<ApiResponse<{ locations: LocationResult[] }>> {
        return this.request<ApiResponse<{ locations: LocationResult[] }>>(
            'GET',
            `/location/search?q=${encodeURIComponent(query)}`
        );
    }

    async updateSelfLocation(payload: { name: string; lat: number; lon: number }): Promise<ApiResponse<User>> {
        return this.request<ApiResponse<User>>(
            'PUT',
            '/user/me/location',
            payload,
            {'Content-Type': 'application/json'}
        );
    }

    async getSelfToken(): Promise<ApiResponse<{ token: string }>> {
        return this.request("GET", "/auth/token");
    }

    async getTamagotchi(): Promise<ApiResponse<TamagotchiResponse>> {
        return this.request("GET", "/tamagotchi");
    }

    async feedTamagotchi(): Promise<ApiResponse<TamagotchiResponse>> {
        return this.request("POST", "/tamagotchi/feed");
    }

    async playTamagotchi(): Promise<ApiResponse<TamagotchiResponse>> {
        return this.request("POST", "/tamagotchi/play");
    }

    async cleanTamagotchi(): Promise<ApiResponse<TamagotchiResponse>> {
        return this.request("POST", "/tamagotchi/clean");
    }

    async sleepTamagotchi(): Promise<ApiResponse<TamagotchiResponse>> {
        return this.request("POST", "/tamagotchi/sleep");
    }

    async awakeTamagotchi(): Promise<ApiResponse<TamagotchiResponse>> {
        return this.request("POST", "/tamagotchi/awake");
    }

    private async request<T>(method: Method, url: string, data?: any, headers?: any): Promise<T> {
        try {
            const response = await this.api.request<T>({
                    method,
                    url,
                    data,
                    headers,
                    validateStatus: (status) => status >= 200 && status < 500,
                }
            );
            return response.data;
        } catch (error) {
            // Silently throw connection errors to avoid log spam
            throw error;
        }
    }
}

// Singleton instance
const restService = new RestService();

export {RestService, restService};
