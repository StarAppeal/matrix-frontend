export type ThemeType = {
    colors: {
        background: string; // Haupt-Hintergrundfarbe
        text: string; // Standard-Textfarbe
        primary: string; // Primärfarbe (Buttons, Hervorhebungen)
        secondary: string; // Sekundärfarbe (Akzente, Links)
        error: string; // Farbe für Fehler
        success: string; // Farbe für Erfolgsmeldungen
        warning: string; // Farbe für Warnungen
        disabled: string; // Farbe für deaktivierte Buttons/Elemente
        border: string; // Farbe für Ränder
        card: string; // Hintergrundfarbe für Karten
        overlay: string; // Überlagerungen (z. B. modale Dialoge)
        shadow: string; // Schattenfarbe (bei Karten oder Schaltflächen)
    };
    spacing: (factor: number) => number; // Funktion für dynamische Abstände
    name: string; // Name des Themes
};

const lightTheme: ThemeType = {
    colors: {
        background: "#ffffff", // Heller Hintergrund
        text: "#000000", // Schwarzer Text
        primary: "#6200ee", // Lila als Hauptfarbe
        secondary: "#03dac6", // Türkis für Akzente
        error: "#b00020", // Rot für Fehler
        success: "#4caf50", // Grün für Erfolg
        warning: "#ff9800", // Orange für Warnungen
        disabled: "#e0e0e0", // Grauer Ton für deaktivierte Elemente
        border: "#dcdcdc", // Hellgrauer Rand
        card: "#f8f9fa", // Leicht grauer Hintergrund für Karten
        overlay: "rgba(0, 0, 0, 0.4)", // Transparenter schwarzer Overlay
        shadow: "rgba(0, 0, 0, 0.2)", // Leichte Schattenfarbe
    },
    spacing: (factor: number) => factor * 8, // Basis 8px
    name: "light",
};


const darkTheme: ThemeType = {
    colors: {
        background: "#121212", // Dunkler Hintergrund
        text: "#ffffff", // Weißer Text
        primary: "#bb86fc", // Hellviolett als Hauptfarbe
        secondary: "#03dac6", // Türkis für Akzente
        error: "#cf6679", // Helles Rot für Fehler
        success: "#66bb6a", // Hellgrün für Erfolg
        warning: "#ffa726", // Helles Orange für Warnungen
        disabled: "#666666", // Grauer Ton für deaktivierte Elemente
        border: "#333333", // Dunkelgrauer Rand
        card: "#1e1e1e", // Dunkler Hintergrund für Karten
        overlay: "rgba(255, 255, 255, 0.1)", // Transparenter weißer Overlay
        shadow: "rgba(0, 0, 0, 0.8)", // Dunklere Schattenfarbe
    },
    spacing: (factor: number) => factor * 8, // Basis 8px
    name: "dark",
};


export const themes = {light: lightTheme, dark: darkTheme};

export function getThemeType(theme: string): ThemeType {
    if (theme === "light") {
        return lightTheme;
    }
    return darkTheme;
}
