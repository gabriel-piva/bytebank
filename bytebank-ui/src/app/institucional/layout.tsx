"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Space_Grotesk } from "next/font/google";
import React from "react";
import { Toaster } from "sonner";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const queryClient = new QueryClient();

interface InstitucionalLayoutProps {
  children: React.ReactNode;
}

export default function InstitucionalLayout({ children }: InstitucionalLayoutProps) {
  return (
    <html lang="pt-BR" className={spaceGrotesk.variable}>
      <body>
        <Toaster richColors position="top-right" />
        <QueryClientProvider client={queryClient}>
          <main className="min-h-screen w-full">
            {children}
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
} 