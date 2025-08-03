"use client";

import { useEffect } from "react";

export default function TransfersPage() {
  useEffect(() => {
    // Com Multi-Zones, o Next.js faz o rewrite automaticamente
    // Esta página serve apenas como fallback caso o rewrite falhe
    console.log(
      "TransfersPage carregada - verificando configuração de multi-zones"
    );
  }, []);

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-[var(--surface)]">
      <div className="p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Dashboard de Transferências</h2>
        <p className="mb-4 text-gray-600">
          Se você está vendo esta mensagem, o microfrontend Angular não está
          rodando.
        </p>
        <p className="text-sm text-gray-500">
          Certifique-se de que o servidor Angular está rodando em
          http://localhost:4201
        </p>
        <div className="mt-6 rounded-lg bg-gray-100 p-4">
          <code className="text-sm">npm run angular:serve</code>
        </div>
      </div>
    </div>
  );
}
