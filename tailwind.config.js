/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        foreground: "#FAFAFA",
        primary: {
          DEFAULT: "#6366f1",
          foreground: "#FAFAFA",
        },
        secondary: {
          DEFAULT: "#27272A",
          foreground: "#FAFAFA",
        },
        muted: {
          DEFAULT: "#27272A",
          foreground: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#6366f1",
          foreground: "#FAFAFA",
        },
        card: {
          DEFAULT: "#09090B",
          foreground: "#FAFAFA",
        },
        border: "#27272A",
        input: "#27272A",
        ring: "#6366f1",
      },
      borderRadius: {
        md: "8px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
