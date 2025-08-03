"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Pequeno delay para garantir que o localStorage seja lido
    const checkAuth = () => {
      console.log("RootPage - isAuthenticated:", isAuthenticated);
      if (isAuthenticated) {
        console.log("Redirecting to /home");
        router.push("/home");
      } else {
        console.log("Redirecting to /login");
        router.push("/login");
      }
      setIsChecking(false);
    };

    // Usar setTimeout para evitar problemas de hidratação
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return null;
}
