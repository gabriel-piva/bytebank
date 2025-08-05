"use client";

import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Space_Grotesk } from "next/font/google";
import React from "react";
import { Toaster } from "sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const queryClient = new QueryClient();

interface InstitucionalLayoutProps {
  children: React.ReactNode;
}

export default function InstitucionalLayout({
  children,
}: InstitucionalLayoutProps) {
  return (
    <html lang="pt-BR" className={spaceGrotesk.variable}>
      <body>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster richColors position="top-right" />
            <main className="min-h-screen w-full">{children}</main>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
