"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LoginLayoutProps {
  children: React.ReactNode;
}
export default function LoginLayout({ children }: LoginLayoutProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(
        "User already authenticated in LoginLayout, redirecting to home"
      );
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  // Não retornar null para evitar problemas de hidratação
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface)]">
      {!isAuthenticated ? children : <div>Redirecionando...</div>}
    </div>
  );
}
