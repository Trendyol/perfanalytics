/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ["0.75rem", "1.125rem"],
      sm: ["0.875rem", "1.25rem"],
      md: ["1rem", "1.5rem"],
      lg: ["1.125rem", "1.75rem"],
      xl: ["1.25rem", "1.875rem"],
      displayXs: ["1.5rem", "2rem"],
      displaySm: ["1.875rem", "2.375rem"],
      displayMd: ["2.25rem", "2.75rem"],
      displayLg: ["3rem", "3.75rem"],
      displayXl: ["3.75rem", "4.5rem"],
      display2Xl: ["4.5rem", "5.625rem"],
    },
    extend: {
      height: {
        header: "70px",
      },
      colors: {
        primary: "#f27a1a",
        secondary: "#1890ff",
        black: "#092C4C",
        border: "#e6e6e6",
        white: "#ffffff",
        success: "#12b76A",
        warning: "#f79009",
        error: "#f04438",
        gray: {
          25: "#fcfcfd",
          50: "#f9fafb",
          100: "#f2f4f7",
          200: "#eaecf0",
          300: "#d0d5dd",
          400: "#98a2b3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1d2939",
          900: "#101828",
        },
      },
      animation: {
        "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
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
