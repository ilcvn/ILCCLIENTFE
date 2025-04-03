/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        neutralSilver: "#F5F7FA",
        neutralDGrey: "#4D4D4D",
        brandPrimary: "#07689f",
        brandSecondary: "#f17458",
        neutralGrey: "#717171",
        copyright: "#747474",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
