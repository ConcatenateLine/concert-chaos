/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#171717",
        border: "#727272",
        foreground: "#3b3b3b",
        emojiColor: "#ffc83d",
      },
    },
  },
  plugins: [],
};
