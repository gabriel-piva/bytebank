export interface Transaction {
  id: string;
  account_id: string;
  amount: string;
  description: string;
  transaction_date: string;
  category: TransactionCategory;
  attachment?: string;
}
export interface TransactionParams {
  page?: number;
  pageSize?: number;
  order?: "asc" | "desc";
  category?: TransactionCategory;
  maxAmount?: string;
  minAmount?: string;
}
export interface TransactionPaginated {
  transactions: Transaction[];
  pagination: {
    page: number;
    totalPages: number;
    totalTransactions: number;
  };
}
export interface TransactionCreate {
  account_id: string;
  amount: string;
  description: string;
  category: TransactionCategory;
  attachment?: string;
}
export interface TransactionEdit {
  amount: string;
  description: string;
  category: TransactionCategory;
  attachment?: string;
}
export interface TransactionFormState {
  amount: string;
  description: string;
  category: string;
  attachment?: File | string;
}
export type TransactionCategory = "entrada" | "saida";
export interface TransactionCategoryOption {
  id: TransactionCategory;
  name: "Entrada" | "Saída";
}
