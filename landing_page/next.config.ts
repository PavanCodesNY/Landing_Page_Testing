import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React strict mode for better development
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
