import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pcc: {
          // Warm tones
          gold: {
            DEFAULT: '#f4b73f',
            light: '#f7c766',
            dark: '#d89e1a',
          },
          orange: {
            DEFAULT: '#d86018',
            light: '#e67d3d',
            dark: '#b34d0f',
          },
          rust: {
            DEFAULT: '#955d29',
            light: '#a87440',
            dark: '#6e4520',
          },
          brick: {
            DEFAULT: '#9e4c31',
            light: '#b56549',
            dark: '#7d3a24',
          },
          // Reds
          crimson: {
            DEFAULT: '#9f2a28',
            light: '#b54845',
            dark: '#7a1f1e',
          },
          brown: '#72423b',
          // Cool tones
          sage: {
            DEFAULT: '#849c8d',
            light: '#9eb0a3',
            dark: '#6a7f73',
          },
          forest: {
            DEFAULT: '#486358',
            light: '#5d7a6e',
            dark: '#374c43',
          },
          emerald: {
            DEFAULT: '#346e4b',
            light: '#498d63',
            dark: '#285639',
          },
          teal: {
            DEFAULT: '#31825e',
            light: '#49a079',
            dark: '#256649',
          },
          navy: {
            DEFAULT: '#254b5a',
            light: '#3a6575',
            dark: '#1a3640',
          },
          deepBlue: '#003b6f',
          // Neutrals
          cream: {
            DEFAULT: '#e7e3db',
            light: '#f0ede8',
            dark: '#d4cfc5',
          },
          stone: {
            DEFAULT: '#bab6a9',
            light: '#cbc8bd',
            dark: '#a19d8f',
          },
          slate: {
            DEFAULT: '#6c6956',
            light: '#86856e',
            dark: '#524f3f',
          },
          charcoal: '#505251',
        },
      },
    },
  },
  plugins: [],
};

export default config;
