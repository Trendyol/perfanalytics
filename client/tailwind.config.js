/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f27a1a",
        secondary: "#1890ff",
        dark: "#092C4C",
        border: "#dcdfe3",
      },
      fontSize: {
        heading1: ["56px", "61.5px"],
        heading2: ["48px", "52.8px"],
        heading3: ["40px", "44px"],
        heading4: ["32px", "35.2px"],
        heading5: ["24px", "26.4px"],
        heading6: ["20px", "22px"],
        large: ["20px", "28px"],
        medium: ["18px", "25.2px"],
        normal: ["16px", "22.4px"],
        small: ["14px", "19.6px"],
        xsmall: ["12px", "16px"],
      },
      width: {
        container: "1300px",
        sidebar: "256px"
      },
      height: {
        header: "70px"
      }
    },
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    theme: "light",
    themes: [
      {
        light: {
          primary: "#f27a1a",
          secondary: "#1890ff",
          neutral: "#ffffff",
          error: "#ff0000",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
