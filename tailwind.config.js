/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satisfy: ["Satisfy", "cursive"],
        inter: ["Inter", "sans-serif"],
        gloock: ["Gloock", "serif"],
      },
    },
  },
  plugins: [],
};
