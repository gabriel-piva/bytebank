import { Account } from "@/types/accountEntities";
import { apiFetch } from "./client";

const ACCOUNT_ENDPOINT = "accounts";

export async function getAccountsByUserId(userId: string): Promise<Account[]> {
  try {
    const response = await apiFetch(
      `${ACCOUNT_ENDPOINT}/findByUserId?userId=${encodeURIComponent(userId)}`
    );
    return response.json();
  } catch (error) {
    console.error("Falha ao buscar dados da conta:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao buscar conta."
    );
  }
}
