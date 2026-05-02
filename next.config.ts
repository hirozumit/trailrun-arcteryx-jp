import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  devIndicators: false 
};

export default nextConfig;
