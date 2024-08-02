import {
  primaryColor,
  secondaryColor,
  grayColor,
  redColor,
  blueColor,
  greenColor,
} from "./color.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    fontFamily: {
      body: [
        "'Pavanam'",
        "'Noto Sans TC'",
        "-apple-system",
        "BlinkMacSystemFont",
        "'Segoe UI'",
        "Roboto",
        "'Helvetica Neue'",
        "Arial",
        "sans-serif",
        "'Apple Color Emoji'",
        "'Segoe UI Emoji'",
        "'Segoe UI Symbol'",
        "'Noto Color Emoji'",
      ],
    },
    extend: {
      colors: {
        primary: {
          ...primaryColor,
        },
        secondary: {
          ...secondaryColor,
        },
        gray: {
          ...grayColor,
        },
        red: {
          ...redColor,
        },
        blue: {
          ...blueColor,
        },
        green: {
          ...greenColor,
        },
      },
      listStyleType: {
        square: "square",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
},
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("autoprefixer"),
  ],
};
