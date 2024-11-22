import axios from 'axios';
import User from "@/model/User";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

const RestService = {
  fetchAllUser: async () => {
    try {
      const response = await axios.get<{ users: User[] }>(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCurrentlyPlayingSong: async (accessToken: string) => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  sendPayloadToSocket: async (userId: string, payload: Object) => {
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
      throw error;
    }
  },

  broadcast: async (payload: Object) => {
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
      throw error;
    }
  },
};


export {RestService};
