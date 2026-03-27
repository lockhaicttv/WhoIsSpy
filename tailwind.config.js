/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#578060", // Neutral Green
        surface: "#deffe1",
        primary: "#6fb368", // Mint Green
        secondary: "#058f4c", // Vibrant Green
        tertiary: "#f78a2a", // Orange Accent
      },
    },
  },
  plugins: [],
};
