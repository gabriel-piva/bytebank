import { User } from "@/types/userEntities";
import { apiFetch } from "./client";

const USER_ENDPOINT = "users";

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const response = await apiFetch(
      `${USER_ENDPOINT}/findByEmail?email=${encodeURIComponent(email)}`
    );
    return response.json();
  } catch (error) {
    console.error("Falha ao buscar dados do usuário:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao buscar usuário."
    );
  }
}
