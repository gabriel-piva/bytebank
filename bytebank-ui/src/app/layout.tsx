"use client";

import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

// Temporariamente comentado para debug
// const spaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-space-grotesk",
// });

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Capturar erros globais
    const handleError = (event: ErrorEvent) => {
      console.error("Global error:", event.error);
      setError(event.error?.message || "Erro desconhecido");
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      setError(event.reason?.message || "Erro de promise rejeitada");
    };

    if (typeof window !== "undefined") {
      window.addEventListener("error", handleError);
      window.addEventListener("unhandledrejection", handleUnhandledRejection);

      return () => {
        window.removeEventListener("error", handleError);
        window.removeEventListener(
          "unhandledrejection",
          handleUnhandledRejection
        );
      };
    }
  }, []);

  if (error) {
    return (
      <html lang="pt-BR">
        <body>
          <div style={{ padding: "20px", color: "red" }}>
            <h1>Erro da Aplicação</h1>
            <p>{error}</p>
            <button onClick={() => setError(null)}>Tentar Novamente</button>
          </div>
        </body>
      </html>
    );
  }
  try {
    return (
      <html lang="pt-BR">
        <body>
          {/* Toaster temporariamente removido para debug */}
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <main className="min-h-screen w-full overflow-x-hidden">
                  {children}
                </main>
              </AuthProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </body>
      </html>
    );
  } catch (err) {
    console.error("Erro no RootLayout:", err);
    return (
      <html lang="pt-BR">
        <body>
          <div style={{ padding: "20px", color: "red" }}>
            <h1>Erro no Layout</h1>
            <p>{err instanceof Error ? err.message : "Erro desconhecido"}</p>
          </div>
        </body>
      </html>
    );
  }
}
