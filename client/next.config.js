/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");

const nextConfig = {
  ...nextTranslate(),
  reactStrictMode: true,
  i18n: {
    locales: ["en", "tr"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
