import { getTransactionsByAccountId, getExtratoTransacoes } from "@/api/transactionService";
import { Transaction } from "@/types/transactionEntities";
import { useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";

// Tipo para a resposta da API de extrato
interface ExtratoResponse {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
}

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

export function useExtratoInfiniteScroll(accountId: string | null | undefined) {
  const queryClient = useQueryClient();

  const queryResult = useInfiniteQuery({
    queryKey: ["extrato-transacoes", accountId],
    initialPageParam: 1,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      if (!accountId) throw new Error("AccountId é obrigatório");
      
      // Usar sempre 12 itens por página
      const pageSize = 12;
      
      const result = await getExtratoTransacoes(accountId, pageParam, pageSize);
      
      console.log(`✅ Página ${pageParam} carregada: ${result.data.length} itens`);
      
      return result;
    },
    enabled: !!accountId,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page;
      const totalItems = lastPage.total;
      const itemsInCurrentPage = lastPage.data.length;
      
      // Se a página atual tem itens E ainda há mais itens para carregar
      if (itemsInCurrentPage > 0 && currentPage * lastPage.pageSize < totalItems) {
        return currentPage + 1;
      }
      return undefined; // Não há mais páginas
    },
    staleTime: 5 * 60 * 1000, // 5 minutos de cache
    retry: 3, // 3 tentativas
    retryDelay: 1000, // 1 segundo de delay entre tentativas
  });

  const invalidateExtratoQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["extrato-transacoes", accountId],
    });
  };

  // Flatten todas as transações de todas as páginas
  const allTransactions = queryResult.data?.pages.flatMap((page: ExtratoResponse) => page.data) || [];

  return {
    ...queryResult,
    transactions: allTransactions,
    invalidateExtratoQuery,
    hasNextPage: queryResult.hasNextPage,
    isFetchingNextPage: queryResult.isFetchingNextPage,
    fetchNextPage: queryResult.fetchNextPage,
  };
}
