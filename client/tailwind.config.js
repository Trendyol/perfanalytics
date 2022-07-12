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
      height: {
        header: "70px",
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
    fontSize: {
      "display-2xl": ["4.5rem", "5.625rem"],
      "display-xl": ["3.75rem", "4.5rem"],
      "display-lg": ["3rem", "3.75rem"],
      "display-md": ["2.25rem", "2.75rem"],
      "display-sm": ["1.875rem", "2.375rem"],
      "display-xs": ["1.5rem", "2rem"],
      xl: ["1.25rem", "1.875rem"],
      lg: ["1.125rem", "1.75rem"],
      md: ["1rem", "1.5rem"],
      sm: ["0.875rem", "1.25rem"],
      xs: ["0.75rem", "1.125rem"],
    },
    colors: {
      primary: "#f27a1a",
      secondary: "#1890ff", // TODO: sil bunu
      black: "#092C4C",
      border: "#e6e6e6", // sil
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
