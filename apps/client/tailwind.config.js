/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
  },
  plugins: [],
};
