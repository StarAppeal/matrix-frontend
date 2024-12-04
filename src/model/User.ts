export interface User {
  name: string,
  uuid: string,
  _id: string,
  config: UserConfig,
  lastState: MatrixState,
  spotifyConfig: SpotifyConfig
}

export interface UserConfig {
  isVisible: boolean,
  canBeModified: boolean,
  isAdmin: boolean
}

export interface MatrixState {
  global: {
    mode: 'image' | 'text' | "idle" | "music" | "clock";
    brightness: number;
  };
  text: {
    text: string;
    align: 'left' | 'center' | 'right';
    speed: number;
    size: number;
    color: [number, number, number];
  };
  image: {
    image: string; // Der Name der Bilddatei
  };
  clock: {
    color: [number, number, number]; // RGB-Werte
  };
  music: {
    fullscreen: boolean;
  };
}

export interface SpotifyConfig {
  accessToken: string;
  refreshToken: string;
  expirationDate: Date;
  scope: string;
}

