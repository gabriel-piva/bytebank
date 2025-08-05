import { User } from "@/types/userEntities";
import { apiFetch } from "./client";

export async function login(
  email: string,
  password: string
): Promise<{ token: string; user: User }> {
  try {
    const response = await apiFetch("login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.error("Login API returned error status:", response.status);
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha ao fazer login:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao fazer login."
    );
  }
}
