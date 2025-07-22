import {
  Transaction,
  TransactionCategory,
  TransactionCreate,
  TransactionEdit,
} from "@/types/transactionEntities";
import { apiFetch } from "./client";

const TRANSACTION_ENDPOINT = "transactions";
const TRANSACTION_CATEGORIES_ENDPOINT = "transaction-categories";

export async function getTransactionsByAccountId(
  accountId: string
): Promise<Transaction[]> {
  try {
    const response = await apiFetch(
      `${TRANSACTION_ENDPOINT}/findByAccountId?accountId=${encodeURIComponent(accountId)}&orderBy=desc`
    );
    return response.json();
  } catch (error) {
    console.error("Falha ao buscar transações da conta:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao buscar transações da conta."
    );
  }
}

export async function createTransaction(
  transactionData: TransactionCreate
): Promise<Transaction> {
  try {
    const response = await apiFetch(TRANSACTION_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(transactionData),
    });
    return response.json();
  } catch (error) {
    console.error("Falha ao criar transação:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao criar transação."
    );
  }
}

export async function getTransactionCategories(): Promise<
  TransactionCategory[]
> {
  try {
    const response = await apiFetch(TRANSACTION_CATEGORIES_ENDPOINT);
    return response.json();
  } catch (error) {
    console.error("Falha ao buscar categorias de transação:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao buscar categorias de transação."
    );
  }
}

export async function deleteTransaction(
  transactionId: string
): Promise<true | false | null> {
  try {
    await apiFetch(`${TRANSACTION_ENDPOINT}/${transactionId}`, {
      method: "DELETE",
    });

    return true;
  } catch (error) {
    console.error("Falha ao deletar transação:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao deletar transação."
    );
  }
}

export async function editTransaction(
  transactionData: TransactionEdit
): Promise<Transaction> {
  try {
    const response = await apiFetch(
      `${TRANSACTION_ENDPOINT}/${transactionData.id}`,
      {
        method: "PUT",
        body: JSON.stringify(transactionData),
      }
    );
    return response.json();
  } catch (error) {
    console.error("Falha ao editar transação:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao editar transação."
    );
  }
}
