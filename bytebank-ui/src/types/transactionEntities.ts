export interface Transaction {
  id: string;
  account_id: string;
  amount: string;
  description: string;
  transaction_date: string;
  category_id: string;
  category_name: TransactionCategoryName;
}
export interface TransactionCreate {
  accountId: string;
  amount: number;
  description: string;
  transactionDate: string;
  categoryId: string;
}
export interface TransactionDelete {
  transactionId: string;
  accountId: string;
}
export interface TransactionEdit {
  id: string;
  categoryId: string;
  amount: number;
  description: string;
  transactionDate: string;
}

export interface TransactionFormState {
  categoryId: string;
  amount: string;
  description: string;
}

// Transaction Category
export type TransactionCategoryName = "Entrada" | "Saída";
export interface TransactionCategory {
  id: string;
  name: TransactionCategoryName;
}
