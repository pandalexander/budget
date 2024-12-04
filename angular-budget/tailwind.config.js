/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      primaryRed: "#769EB3",
      ...colors,
    },
  },
  plugins: [],
};
