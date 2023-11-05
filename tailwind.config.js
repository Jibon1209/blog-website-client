/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: "'Manrope', sans-serif",
      },
      colors: {
        accent: "#3aaf9f",
        accentDark: "#297c71",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
