import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // Excluir pasta microfrontends do build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/microfrontends/**", "**/node_modules/**"],
    };

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
    // Se TRANSFERS_DOMAIN estiver configurado, fazer proxy para servidor externo
    if (process.env.TRANSFERS_DOMAIN && process.env.TRANSFERS_DOMAIN.startsWith('http')) {
      return [
        {
          source: "/transfers",
          destination: `${process.env.TRANSFERS_DOMAIN}/transfers/`,
        },
        {
          source: "/transfers/:path*",
          destination: `${process.env.TRANSFERS_DOMAIN}/transfers/:path*`,
        },
      ];
    }
    
    // Senão, servir Angular buildado localmente (arquivos estáticos)
    return [
      {
        source: "/transfers",
        destination: "/transfers/index.html",
      },
      {
        source: "/transfers/:path*",
        destination: "/transfers/index.html",
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
