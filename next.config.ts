import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Silence workspace root inference warning
    root: path.resolve(__dirname),
  },
} as NextConfig;

export default nextConfig;
