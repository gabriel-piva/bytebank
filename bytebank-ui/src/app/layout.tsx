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

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={spaceGrotesk.variable}>
      <body>
        <Toaster richColors position="top-right" />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <main className="overflow-x-hiddren min-h-screen w-full">
              {children}
            </main>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
