"use client";

import Logotipo from "@/assets/logotipo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: login, isPending, error } = useLogin();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({
      email: email,
      password: password,
    });
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
      {error && (
        <p className="mb-4 text-sm text-red-500">
          Login inválido. Tente novamente.
        </p>
      )}
      <Button
        type="submit"
        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
        disabled={isPending}
      >
        {isPending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
