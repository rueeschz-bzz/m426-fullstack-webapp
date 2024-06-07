import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
      "./app/login/*.tsx",
      "./app/signup/*.tsx"
  ],
  daisyui: {
    themes : ["light", "dark", "nord"]
  },
  theme: {
    extend: {
      screens: {
        "lp-res":"1120px"
      },
      animation: {
        orbit: "orbit calc(var(--duration)*1s) linear infinite",
      },
      keyframes: {
        orbit: {
          "0%": {
            transform: "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
      },
      colors: {
        "snow1": "#ECEFF4",
        "snow2": "#E5E9F0",
        "snow3": "#D8DEE9",
        "polar1": "#4C566A",
        "polar2": "#434C5E",
        "polar3": "#3B4252",
        "polar4": "#2E3440",
        "frost1": "#81A1C1",
        "frost2": "#5E81AC",


      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui"), nextui()],
};
export default config;
