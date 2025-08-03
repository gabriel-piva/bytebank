"use client";

import { User } from "@/types/userEntities";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  authenticateUser: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se estamos no cliente
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Erro ao parsear usuário do localStorage:", error);
        }
      }
    }
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setUser(null);
  };

  const authenticateUser = (user: User) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticateUser,
        isAuthenticated: !!user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
