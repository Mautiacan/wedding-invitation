import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          bark: "#3A5E3A",
          warmBrown: "#6F7E5B",
          moss: "#6E8F5F",
          pink: "#E37FA1",
          yellow: "#F8DC29",
          peach: "#EFA48C",
          cream: "#E3DBC6",
          mist: "#E4EAEC"
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        warm: "0 12px 30px rgba(78, 69, 56, 0.18)"
      },
      backgroundImage: {
        "forest-glow":
          "radial-gradient(circle at 20% 20%, rgba(239, 164, 140, 0.22), transparent 40%), radial-gradient(circle at 80% 0%, rgba(248, 220, 41, 0.12), transparent 35%), linear-gradient(135deg, rgba(151, 172, 98, 0.32), rgba(227, 219, 198, 0.6))"
      }
    }
  },
  plugins: []
};

export default config;
