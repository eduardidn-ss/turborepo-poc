import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/demo-zone",
  basePath: "/demo-zone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
