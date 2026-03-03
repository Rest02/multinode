/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#f0b428",
        "background-light": "#f8f7f6",
        "background-dark": "#0f0f0f",
        "surface-dark": "#1c1c1e",
        "menu-dark": "#1a1a1a",
        "muted-gray": "#888890",
        "crisp-white": "#e8e8e8",
        "charcoal": "#1c1c1e",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1.25rem", // 20px squircles
        "xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
};
