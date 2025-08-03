"use client";

import Logotipo from "@/assets/logotipo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: login, isPending, error } = useLogin();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted - attempting login with:", { email });
    try {
      await login({
        email: email,
        password: password,
      });
      console.log("Login mutation completed");
    } catch (err) {
      console.error("Login failed with error:", err);
    }
  };

  return (
    <div className="relative">
      {/* Background decorativo */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--color-primary)]/5 via-transparent to-[var(--color-secondary)]/5" />

      <form
        onSubmit={handleLogin}
        className="hover:shadow-3xl relative mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <Image
            src={Logotipo}
            className="mx-auto mb-4 w-[70%] transition-transform duration-300 hover:scale-105"
            alt="Bytebank Logotipo"
            priority
          />
          <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-heading)]">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-[var(--color-text-menu)]">
            Acesse sua conta para continuar
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-[var(--color-text-heading)]"
          >
            E-mail
          </label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[var(--color-text-menu)]" />
            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-gray-200 pl-11 transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-[var(--color-text-heading)]"
          >
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[var(--color-text-menu)]" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 border-gray-200 pr-11 pl-11 transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 transform text-[var(--color-text-menu)] transition-colors duration-200 hover:text-[var(--color-text-heading)]"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="animate-in slide-in-from-top-1 mb-6 rounded-lg border border-red-200 bg-red-50 p-3 duration-200">
            <p className="text-sm font-medium text-red-600">
              Login inválido. Tente novamente.
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="h-12 w-full transform cursor-pointer rounded-xl bg-[var(--color-primary)] font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--color-primary-hover)] hover:shadow-xl active:scale-[0.98]"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Entrando...
            </div>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </div>
  );
}
