"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

interface LoginLayoutProps {
  children: React.ReactNode;
}
export default function LoginLayout({ children }: LoginLayoutProps) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) redirect("/home");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface)]">
      {children}
    </div>
  );
}
