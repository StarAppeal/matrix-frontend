/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/core/colors');

module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ["System", "sans-serif"],
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
      },
      borderRadius: {
        "xl": "12px",
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 15px rgba(99, 102, 241, 0.5)',
        'glow-lg': '0 0 30px rgba(99, 102, 241, 0.6)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        'gradient-dark': 'linear-gradient(180deg, #18181B 0%, #09090B 100%)',
      },
    },
  },
  plugins: [],
};

