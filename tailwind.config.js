// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, 
  theme: {
    extend: {
      colors: {
        background: "#f9f4ef",
        primary: "#faeee7",
        secondary: "#eaddcf",
        // highlight: " #ffc6c7",
        highlight: "#ff6699",
        headline: "#33272a",
        "paragraph-text": "#594a4e",
        "button-text": "#fffffe",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
