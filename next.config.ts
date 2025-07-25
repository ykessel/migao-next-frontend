import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://storage.googleapis.com/daily-toque-bucket-1/**'),
      new URL('https://developers.google.com/identity/images/**')
    ],
  },
};

export default nextConfig;
