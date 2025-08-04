"use client";

import { redirect } from "next/navigation";

export default function RootPage() {
  // Redireciona diretamente para a página institucional
  redirect("/institucional");
}
