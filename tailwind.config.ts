import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#ffffff",
        ink: "#222222",
        "ink-soft": "#555555",
        "ink-mute": "#999999",
        line: "#e5e5e5",
        "line-soft": "#f0f0f0",
      },
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      maxWidth: {
        site: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
