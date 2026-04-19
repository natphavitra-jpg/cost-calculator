/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  async rewrites() {
    return [
      {
        source: "/tg-proxy/:path*",
        destination: "https://api.telegram.org/:path*",
      },
    ];
  },
};
module.exports = nextConfig;
