import axios from 'axios';
import {makeRedirectUri} from "expo-auth-session";
import User from "@/model/User";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

export interface Token {
    access_token: string,
    refresh_token: string,
    expires_in: number,
    token_type: string,
    scope: string,

}


const RestService = {
    exchangeSpotifyCodeForToken: async (code: string) => {
        try {
            const redirectUri = makeRedirectUri({
                scheme: 'led.matrix',
                path: 'callback',
            });
            const response = await axios.get<{ token: Token }>(
                `${API_URL}/spotify/token/generate/code/${code}/redirect-uri/${encodeURIComponent(redirectUri)}`, {
                    headers: {
                        Authorization: `Bearer ${JWT_TOKEN}`,
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error exchanging Spotify code:", error);
            throw error;
        }
    },

    fetchAllUser: async () => {
        try {
            const response = await axios.get<{ users: User[] }>(`${API_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${JWT_TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    },

    sendPayloadToSocket: async (userId: string, payload: object) => {
        try {
            const response = await axios.post(
                `${API_URL}/websocket/send-message`,
                {users: [userId], payload},
                {
                    headers: {
                        Authorization: `Bearer ${JWT_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error sending payload to socket:", error);
            throw error;
        }
    },

    broadcast: async (payload: object) => {
        try {
            const response = await axios.post(
                `${API_URL}/websocket/broadcast`,
                {payload},
                {
                    headers: {
                        Authorization: `Bearer ${JWT_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error broadcasting payload:", error);
            throw error;
        }
    },
};

export {RestService};
