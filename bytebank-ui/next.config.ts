import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  // Configuração para Multi-Zones
  async rewrites() {
    return [
      {
        source: "/transfers",
        destination: `${process.env.TRANSFERS_DOMAIN || "http://localhost:4201"}/transfers/`,
      },
      {
        source: "/transfers/:path*",
        destination: `${process.env.TRANSFERS_DOMAIN || "http://localhost:4201"}/transfers/:path*`,
      },
    ];
  },
  // Headers para permitir comunicação entre zonas
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Origin, X-Requested-With, Content-Type, Accept",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
