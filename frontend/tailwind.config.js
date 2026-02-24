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
        "background-dark": "#221d10",
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
