import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0D9488", dark: "#0F766E", light: "#E6F5F3" },
        brand: { DEFAULT: "#163344", light: "#1E4A63" },
        gold: "#D4B478",
        ink: "#1E293B",
        muted: "#64748B",
      },
      fontFamily: { vazir: ["Vazirmatn", "Tahoma", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
