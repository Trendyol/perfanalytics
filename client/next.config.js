/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");

const nextConfig = {
  ...nextTranslate(),
  reactStrictMode: true,
  i18n: {
    locales: ["en", "tr"],
    defaultLocale: "en",
  },
  images: {
    domains: ["t1.gstatic.com"],
  },
  swcMinify: true,
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
  }
};

module.exports = nextConfig;
