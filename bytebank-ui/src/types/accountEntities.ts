export interface Account {
  id: string;
  user_id: string;
  account_type: "corrente" | "poupanca" | string;
  card_number: string;
  expiration_date: string;
  balance: string;
  created_at: string;
}
