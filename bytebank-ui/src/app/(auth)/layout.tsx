"use client";

import "@/app/globals.css";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import React from "react";
import SideBar from "./home/components/SideBar/SideBar";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) redirect("/login");

  return (
    <div className="flex bg-[var(--background)] px-4 py-6">
      <SideBar />
      <div className="w-full flex-1 pl-2 sm:pl-4 md:pl-6">
        <main className="h-full w-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
