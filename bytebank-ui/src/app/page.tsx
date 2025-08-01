"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function RootPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    redirect("/login");
  } else {
    redirect("/home");
  }
}
