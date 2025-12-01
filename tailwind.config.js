/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
  primary: "#000000",      // main background
  secondary: "#0D0D0D",    // subtle elevation

  light: {
    100: "#FFFFFF",        // pure white text
    200: "#E6E6E6",        // softer white
    300: "#BFBFBF",        // muted grey
  },

  dark: {
    100: "#1A1A1A",        // mild shadow
    200: "#0A0A0A",        // deep shadow
  },

  accent: "#CCCCCC",       // minimal grey accent (neutral + clean)
}
    },
  },
  plugins: [],
};
