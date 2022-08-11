/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  fontFamily: {
    sans: "Inter, Arial, Helvetica, sans-serif",
  },
  extend: {
    colors: {
      "custom-light": "#F5F5F5",
      "custom-dark": "#131101",
      "custom-accent": "#DC682E",
    },
  },
  plugins: [],
};
