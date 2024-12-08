import axios from 'axios';
import {makeRedirectUri} from "expo-auth-session";
import {User} from "@/src/model/User";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Token {
    access_token: string,
    refresh_token: string,
    expires_in: number,
    token_type: string,
    scope: string,

}

const RestService = {
    exchangeSpotifyCodeForToken: async (code: string, jwtToken: string) => {
        try {
            const redirectUri = makeRedirectUri({
                scheme: 'led.matrix',
                path: 'callback',
            });
            const response = await axios.get<{ token: Token }>(
                `${API_URL}/spotify/token/generate/code/${code}/redirect-uri/${encodeURIComponent(redirectUri)}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            );
            return response.data.token;
        } catch (error) {
            console.error("Error exchanging Spotify code:", error);
            throw error;
        }
    },

    fetchAllUser: async (jwtToken: string) => {
        try {
            const response = await axios.get<{ users: User[] }>(`${API_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    },

    fetchUserById: async (id: string, jwtToken: string) => {
        try {
            const response = await axios.get<User>(`${API_URL}/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user by id:", error);
            throw error;
        }
    },

    getSelf: async (jwtToken: string) => {
        try {
            const response = await axios.get<User>(`${API_URL}/user/me`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching self:", error);
            throw error;
        }
    },

    changeSelfPassword: async (
        password: string,
        passwordConfirmation: string,
        jwtToken: string
    ) => {
        try {
            const response = await axios.put<{ result: { success: boolean; message: string } }>(
                `${API_URL}/user/me/password`,
                {password, passwordConfirmation},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                    validateStatus: (status) => status >= 200 && status < 500, // Erlaube 4xx-Statuscodes
                }
            );

            return response.data.result;
        } catch (error) {
            console.error('Unexpected error:', error);
            return {success: false, message: 'An unexpected error occurred.'};
        }
    },

    sendPayloadToSocket: async (userId: string, payload: object, jwtToken: string) => {
        try {
            const response = await axios.post(
                `${API_URL}/websocket/send-message`,
                {users: [userId], payload},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
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

    broadcast: async (payload: object, jwtToken: String) => {
        try {
            const response = await axios.post(
                `${API_URL}/websocket/broadcast`,
                {payload},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
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

    updateUser:
        async (user: User, jwtToken: string) => {
            const {_id, ...rest} = user;
            try {
                const response = await axios.put<User>(
                    `${API_URL}/user/${_id}`,
                    rest,
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                return response.data;
            } catch (error) {
                console.error("Error updating user:", error);
                throw error;
            }
        },

    login: async (username: string, password: string) => {
        const response = await axios.post<{
            success: boolean, token: string, message: string,
            id: "username" | "password"
        }>(
            `${API_URL}/auth/login`, {
                username,
                password,
            }, {
                validateStatus: (status) => status === 200 || status === 401 || status === 404,
            }
        );
        return response.data;
    }
};

export {RestService};
