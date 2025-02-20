/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        "prime-color": "#223A60",
      },
      screens: {
        "xsm": "30rem", 
        "1xl": "90rem", 
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
