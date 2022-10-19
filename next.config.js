/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/ZpTY89c6vp",
      },
    ];
  },
};

module.exports = nextConfig;
