import { User } from "@/types/userEntities";
import { apiFetch } from "./client";

export async function login(
  email: string,
  password: string
): Promise<{ token: string; user: User }> {
  try {
    console.log("Calling login API with email:", email);
    const response = await apiFetch("login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    console.log("Login API response status:", response.status);

    if (!response.ok) {
      console.error("Login API returned error status:", response.status);
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Login API response data:", data);
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
