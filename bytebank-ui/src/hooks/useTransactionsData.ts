import { getTransactionsByAccountId } from "@/api/transactionService";
import { Transaction } from "@/types/transactionEntities";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTransactionData(accountId: string | null | undefined) {
  const queryClient = useQueryClient();

  const queryResult = useQuery<Transaction[] | null>({
    queryKey: ["transactions", accountId],
    queryFn: async (): Promise<Transaction[] | null> => {
      if (!accountId) return null;
      return await getTransactionsByAccountId(accountId);
    },
    enabled: !!accountId,
  });

  const invalidateTransactionsQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["transactions", accountId],
    });
  };

  return {
    ...queryResult,
    transactions: queryResult.data || null,
    invalidateTransactionsQuery,
  };
}
