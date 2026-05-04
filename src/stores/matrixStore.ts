import {create} from 'zustand';
import {MatrixState} from '@/src/model/User';

const defaultMatrixState: MatrixState = {
    global: {mode: 'idle', brightness: 100},
    text: {text: 'Hello World', align: 'center', speed: 50, size: 16, color: [255, 255, 255]},
    image: {image_url: 'https://static.wikia.nocookie.net/tmnt/images/f/f2/Garfield.jpg/revision/latest?cb=20140610130734&path-prefix=de'},
    clock: {color: [0, 255, 0]},
    music: {fullscreen: false},
    game_of_life: {color: [0, 255, 255], speed: 10, cell_size: 2}
};

interface PartialMatrixState {
    global?: Partial<MatrixState['global']>;
    text?: Partial<MatrixState['text']>;
    image?: Partial<MatrixState['image']>;
    clock?: Partial<MatrixState['clock']>;
    music?: Partial<MatrixState['music']>;
    game_of_life?: Partial<MatrixState['game_of_life']>;
}

interface MatrixStore {
    // State
    matrixState: MatrixState;

    // Actions
    updateMatrixState: (newState: PartialMatrixState) => void;
    setGlobalMode: (mode: MatrixState['global']['mode']) => void;
    setBrightness: (brightness: number) => void;
    updateTextConfig: (config: Partial<MatrixState['text']>) => void;
    updateImageConfig: (config: Partial<MatrixState['image']>) => void;
    updateClockConfig: (config: Partial<MatrixState['clock']>) => void;
    updateMusicConfig: (config: Partial<MatrixState['music']>) => void;
    updateGameOfLifeConfig: (config: Partial<MatrixState['game_of_life']>) => void;
    initializeFromUser: (lastState?: MatrixState | null) => void;
    resetToDefaults: () => void;
}

export const useMatrixStore = create<MatrixStore>()((set) => ({
    matrixState: defaultMatrixState,

    updateMatrixState: (newState) =>
        set((state) => ({
            matrixState: {
                global: {...state.matrixState.global, ...newState.global},
                text: {...state.matrixState.text, ...newState.text},
                image: {...state.matrixState.image, ...newState.image},
                clock: {...state.matrixState.clock, ...newState.clock},
                music: {...state.matrixState.music, ...newState.music},
                game_of_life: {...state.matrixState.game_of_life, ...newState.game_of_life},
            },
        })),

    setGlobalMode: (mode) =>
        set((state) => ({
            matrixState: {
                ...state.matrixState,
                global: {...state.matrixState.global, mode},
            },
        })),

    setBrightness: (brightness) =>
        set((state) => ({
            matrixState: {
                ...state.matrixState,
                global: {...state.matrixState.global, brightness},
            },
        })),

    updateTextConfig: (config) =>
        set((state) => ({
            matrixState: {
                ...state.matrixState,
                text: {...state.matrixState.text, ...config},
            },
        })),

    updateImageConfig: (config) =>
        set((state) => ({
            matrixState: {
                ...state.matrixState,
                image: {...state.matrixState.image, ...config},
            },
        })),

    updateClockConfig: (config) =>
        set((state) => ({
            matrixState: {
                ...state.matrixState,
                clock: {...state.matrixState.clock, ...config},
            },
        })),

    updateMusicConfig: (config) =>
        set((state) => ({
            matrixState: {
                ...state.matrixState,
                music: {...state.matrixState.music, ...config},
            },
        })),

    updateGameOfLifeConfig: (config) =>
        set((state) => ({
            matrixState: {
                ...state.matrixState,
                game_of_life: { ...state.matrixState.game_of_life, ...config },
            },
        })),

    initializeFromUser: (lastState) =>
        set(() => ({
            matrixState: {
                ...defaultMatrixState,
                ...(lastState || {}),
                global: {...defaultMatrixState.global, ...(lastState?.global || {})},
                text: {...defaultMatrixState.text, ...(lastState?.text || {})},
                image: {...defaultMatrixState.image, ...(lastState?.image || {})},
                clock: {...defaultMatrixState.clock, ...(lastState?.clock || {})},
                music: {...defaultMatrixState.music, ...(lastState?.music || {})},
            },
        })),

    resetToDefaults: () =>
        set(() => ({
            matrixState: defaultMatrixState,
        })),
}));

