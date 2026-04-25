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
        cream: "#f5efe6",
        "cream-deep": "#ede4d3",
        ink: "#2b2419",
        "ink-soft": "#5a4f3f",
        rose: "#c08772",
        "rose-deep": "#9a6450",
        sage: "#8a9a7b",
        gold: "#b8956a",
        line: "#d4c5ae",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        korean: ["Gowun Batang", "serif"],
        body: ["Gowun Dodum", "sans-serif"],
      },
      boxShadow: {
        warm: "0 12px 30px rgba(43, 36, 25, 0.1)",
        "warm-lg": "0 20px 50px rgba(43, 36, 25, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
