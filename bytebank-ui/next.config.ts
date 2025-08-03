import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Rotear requests do /transfers para a zona Angular
        {
          source: "/transfers",
          destination: `${process.env.TRANSFERS_DOMAIN || "http://localhost:4201"}/transfers`,
        },
        {
          source: "/transfers/:path*",
          destination: `${process.env.TRANSFERS_DOMAIN || "http://localhost:4201"}/transfers/:path*`,
        },
        // Rotear assets estáticos do Angular
        {
          source: "/transfers-static/:path*",
          destination: `${process.env.TRANSFERS_DOMAIN || "http://localhost:4201"}/transfers-static/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
