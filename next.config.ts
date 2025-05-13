import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Optimized for static site generation
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
