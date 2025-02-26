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
        "vsm": "24rem", // 384
        "xsm": "30rem", // 480
        "1xl": "90rem", // 1440
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
