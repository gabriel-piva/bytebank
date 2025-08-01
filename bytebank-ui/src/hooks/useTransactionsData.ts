import { getTransactionsByAccountId } from "@/api/transactionService";
import { TransactionParams } from "@/types/transactionEntities";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

export function useTransactionsData(
  accountId: string | null | undefined,
  params: Omit<TransactionParams, "page">
) {
  const queryClient = useQueryClient();

  const queryResult = useInfiniteQuery({
    queryKey: ["transactions", accountId, params],
    initialPageParam: 1,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      if (!accountId) return null;
      return await getTransactionsByAccountId(accountId, {
        ...params,
        page: pageParam,
      });
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const { pagination } = lastPage;
      return pagination.page < pagination.totalPages
        ? pagination.page + 1
        : undefined;
    },
    enabled: !!accountId,
  });

  const invalidateTransactionsQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["transactions", accountId],
    });
  };
  const allTransactions =
    queryResult.data?.pages.flatMap((page) => page?.transactions ?? []) ?? [];

  return {
    ...queryResult,
    allTransactions,
    transactionsPages: queryResult.data?.pages || [],
    invalidateTransactionsQuery,
  };
}
