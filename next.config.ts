import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Rewrite barrel imports to per-module paths so unused exports from these
  // animation libs are dropped from the client chunks.
  experimental: {
    optimizePackageImports: ["motion", "gsap", "@gsap/react"],
  },
};

export default nextConfig;
