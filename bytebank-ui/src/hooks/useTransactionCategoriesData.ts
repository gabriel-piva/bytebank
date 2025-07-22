import { getTransactionCategories } from "@/api/transactionService";
import { TransactionCategory } from "@/types/transactionEntities";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTransactionCategoriesData() {
  const queryClient = useQueryClient();

  const queryResult = useQuery<TransactionCategory[] | null>({
    queryKey: ["transaction-categories"],
    queryFn: () => getTransactionCategories(),
  });

  const invalidateCategoriesQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["transaction-categories"],
    });
  };

  return {
    ...queryResult,
    transactionCategories: queryResult.data || null,
    invalidateCategoriesQuery,
  };
}
