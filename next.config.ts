import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '', // Leave empty if no specific port is used
        pathname: '/**', // Allow all paths under this hostname
      },
    ],
  },
};

export default nextConfig;
