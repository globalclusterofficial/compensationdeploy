/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "279px",
      sm: "480px",
      sd: "550px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      xm: "2500px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#075985",
          dark: "#0c4a6e",
          light: "#0369a1",
        },
      },
      keyframes: {
        "modal-pop": {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        "modal-pop": "modal-pop 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
