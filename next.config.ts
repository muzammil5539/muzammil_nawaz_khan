import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Optimized for container deployments
  poweredByHeader: false,
};

export default nextConfig;
