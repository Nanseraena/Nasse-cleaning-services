import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#073B73",
          green: "#72B62B",
          ink: "#12263A"
        }
      }
    }
  },
  plugins: []
};

export default config;
