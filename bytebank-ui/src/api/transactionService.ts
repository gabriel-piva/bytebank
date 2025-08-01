import {
  Transaction,
  TransactionCreate,
  TransactionEdit,
  TransactionPaginated,
  TransactionParams,
} from "@/types/transactionEntities";
import { apiFetch } from "./client";

const TRANSACTION_ENDPOINT = "transactions";

export async function getTransactionsByAccountId(
  accountId: string,
  params: TransactionParams
): Promise<TransactionPaginated> {
  let fetchUrl = `${TRANSACTION_ENDPOINT}/accounts/${accountId}?`;

  params = {
    ...params,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 50,
  };

  // Set Search Params
  fetchUrl += `page=${params.page}&pageSize=${params.pageSize}`;
  if (params.order) fetchUrl += `&order=${params.order}`;
  if (params.category) fetchUrl += `&category=${params.category}`;
  if (params.maxAmount) fetchUrl += `&maxAmount=${params.maxAmount}`;
  if (params.minAmount) fetchUrl += `&minAmount=${params.minAmount}`;

  try {
    const response = await apiFetch(fetchUrl);
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

export async function deleteTransaction(transactionId: string) {
  try {
    await apiFetch(`${TRANSACTION_ENDPOINT}/${transactionId}`, {
      method: "DELETE",
    });
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
  id: string,
  transactionData: TransactionEdit
): Promise<Transaction> {
  try {
    const response = await apiFetch(`${TRANSACTION_ENDPOINT}/${id}`, {
      method: "PUT",
      body: JSON.stringify(transactionData),
    });
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
