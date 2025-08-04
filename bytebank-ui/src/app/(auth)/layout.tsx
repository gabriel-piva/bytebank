"use client";

import "@/app/globals.css";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import SideBar from "./home/components/SideBar/SideBar";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Sempre retornar algo para evitar problemas de hidratação
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p>Redirecionando para login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[var(--background)] px-6 py-6">
      <SideBar />
      <div className="w-full flex-1 pl-2 sm:pl-4 md:pl-6">
        <main className="h-full w-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
