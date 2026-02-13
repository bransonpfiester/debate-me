import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream: '#f0ece4',
        'near-black': '#0a0a0a',
        'human-blue': '#2a5cff',
        'ai-red': '#e03e36',
        'muted': '#8a8578',
      },
    },
  },
  plugins: [],
} satisfies Config;
