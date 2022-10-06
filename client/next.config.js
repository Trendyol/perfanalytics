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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        has: [
          {
            type: 'cookie',
            key: 'auth-cookie',
            value: "undefined",
          },
        ],
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
