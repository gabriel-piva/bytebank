"use client";

import Logotipo from "@/assets/logotipo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Senha:", password);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="CCmx-auto w-full max-w-sm rounded-2xl bg-[var(--background)] p-6 shadow-md"
    >
      <Image
        src={Logotipo}
        className="mx-auto mb-8 w-[60%]"
        alt="Bytebank Logotipo"
        priority
      />
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          E-mail
        </label>
        <Input
          id="email"
          type="email"
          placeholder="exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Senha
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
      >
        Entrar
      </Button>
    </form>
  );
}
