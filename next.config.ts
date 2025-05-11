import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Optimized for container deployments
  swcMinify: true,
  poweredByHeader: false,
};

export default nextConfig;
