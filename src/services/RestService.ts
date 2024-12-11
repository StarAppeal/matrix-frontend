import axios, {AxiosInstance, Method} from 'axios';
import {makeRedirectUri} from "expo-auth-session";
import {SpotifyConfig, User} from "@/src/model/User";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Token {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
}

class RestService {
    private readonly jwtToken: string | null;
    private api: AxiosInstance;

    constructor(jwtToken: string | null) {
        this.jwtToken = jwtToken;

        this.api = axios.create({
            baseURL: API_URL,
            timeout: 10000, // Set a timeout for requests
        });

        this.api.interceptors.request.use(
            (config) => {
                if (this.jwtToken) {
                    config.headers.Authorization = `Bearer ${this.jwtToken}`;
                }
                console.log('Request Config:', config);
                return config;
            },
            (error) => {
                console.error('Request Error:', error);
                return Promise.reject(error);
            }
        );

        this.api.interceptors.response.use(
            (response) => {
                console.log('Response Data:', response.data);
                return response;
            },
            (error) => {
                console.error('Response Error:', error.response?.data || error.message);
                return Promise.reject(error);
            }
        );
    }

    async exchangeSpotifyCodeForToken(code: string): Promise<Token> {
        const redirectUri = makeRedirectUri({
            scheme: 'led.matrix',
            path: 'callback',
        });
        return this.request<Token>(
            'GET',
            `/spotify/token/generate/code/${code}/redirect-uri/${encodeURIComponent(redirectUri)}`
        );
    }

    async fetchAllUser(): Promise<{ users: User[] }> {
        return this.request<{ users: User[] }>('GET', '/user');
    }

    async fetchUserById(id: string): Promise<User> {
        return this.request<User>('GET', `/user/${id}`);
    }

    async getSelf(): Promise<User> {
        return this.request<User>('GET', '/user/me');
    }

    async changeSelfPassword(password: string, passwordConfirmation: string): Promise<{ success: boolean; message: string }> {
        return this.request<{ success: boolean; message: string }>(
            'PUT',
            '/user/me/password',
            {password, passwordConfirmation},
            {'Content-Type': 'application/json'}
        );
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

    async updateSelfSpotifyConfig(spotifyConfig: SpotifyConfig): Promise<{ success: boolean; message: string }> {
        return this.request<{ success: boolean; message: string }>(
            'PUT',
            '/user/me/spotify',
            spotifyConfig,
            {'Content-Type': 'application/json'}
        );
    }

    async login(username: string, password: string): Promise<{ success: boolean; token: string; message: string; id: "username" | "password" }> {
        return this.request<{ success: boolean; token: string; message: string; id: "username" | "password" }>(
            "POST",
            '/auth/login',
            {username, password},
            {'Content-Type': 'application/json'}
        );
    }

    private async request<T>(method: Method, url: string, data?: any, headers?: any): Promise<T> {
        try {
            const response = await this.api.request<T>({
                method,
                url,
                data,
                headers,
            });
            return response.data;
        } catch (error) {
            console.error('Error during request:', error);
            throw error;
        }
    }
}

export {RestService};
