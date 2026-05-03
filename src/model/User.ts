export interface User {
  name: string,
  uuid: string,
  _id: string,
  config: UserConfig,
  lastState: MatrixState,
  lastFmUsername: string,
  location: {
    name: string,
    lat: number,
    lon: number
  },
  timezone: string
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
    image_url: string;
  };
  clock: {
    color: [number, number, number]; // RGB
  };
  music: {
    fullscreen: boolean;
  };
}