"use client";

import SideBar from "@/app/dashboard/components/SideBar/SideBar";
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
          <div className="flex bg-[var(--background)] px-4 py-6">
            <SideBar />
            <div className="w-full flex-1 pl-2 sm:pl-4 md:pl-6">
              <main className="h-full w-full overflow-y-auto">{children}</main>
            </div>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
