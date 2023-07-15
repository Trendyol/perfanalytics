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
  webpack: (config, { dev }) => {
    if (dev) {
      config.devServer = {
        hot: true,
        liveReload: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
