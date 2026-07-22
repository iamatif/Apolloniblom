import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'min-h-600': { 'raw': '(min-height: 600px)' },
      'min-h-720': { 'raw': '(min-height: 720px)' },
      '2xsm': "420px",
      'xsm': "400px",
      sm: "640px",
      md: "768px",
      md2: "880px",
      lg: "1024px",
      l: "1120px",
      lx: "1160px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1660px",
      "4xl": "500px",
      "5xl": "1511px",
    },
    extend: {
      scale: {
        250: '2.5',
        300: '3',
      },
      colors: {
        primary: "#2C2C35",
        secondary: "#6B6D7A",
        Gold: "#B19053",
        Gold05:"#FBF9F6",
        Gold1: "#F7F4EE",
        Gold2: "#EFE9DD",
        Gold3: "#E7DECB",
        Gold4: "#E0D3BA",
        Gold6: "#D0BC98",
        Gold9: "#B89B64",
        Gray05: "#F5F5F5",
        Gray10: "#E5E5E5",
        Gray20: "#CCCCCC",
        Gray30: "#B3B3B3",
        Gray40: "#999999",
        Gray60: "#79777A",
        Gray70: "#4D4D4D",
        Gray80: "#333333",
        Gray90: "#1A1A1A",
        Green:"#5FBC56"
      },
    },
  },
  plugins: [],
} satisfies Config;
