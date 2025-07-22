import { deleteTransaction as apiDeleteTransaction } from "@/api/transactionService";
import { TransactionDelete } from "@/types/transactionEntities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseDeleteTransactionHookOptions {
  userId?: string | null;
  onSuccessCallback?: (
    data: boolean | null,
    variables: TransactionDelete
  ) => void;
  onErrorCallback?: (error: Error, variables: TransactionDelete) => void;
}

type DeleteTransactionResponse = boolean | null;

export function useDeleteTransaction(
  hookOptions?: UseDeleteTransactionHookOptions
) {
  const queryClient = useQueryClient();

  const invalidateTransactionsQuery = (accountId: string) => {
    queryClient.invalidateQueries({
      queryKey: ["transactions", accountId],
    });
  };

  const invalidateAccountQuery = (userId: string) => {
    queryClient.invalidateQueries({
      queryKey: ["account", userId],
    });
  };

  const mutation = useMutation<
    DeleteTransactionResponse,
    Error,
    TransactionDelete
  >({
    mutationFn: (variables: TransactionDelete) =>
      apiDeleteTransaction(variables.transactionId),

    onSuccess: (data, variables) => {
      invalidateTransactionsQuery(variables.accountId);

      if (hookOptions?.userId) {
        invalidateAccountQuery(hookOptions.userId);
      }

      toast.success("Transação excluída com sucesso!");

      if (hookOptions?.onSuccessCallback) {
        hookOptions.onSuccessCallback(data, variables);
      }
    },
    onError: (error, variables) => {
      toast.error(
        `Falha ao excluir transação: ${error.message || "Erro desconhecido"}`
      );

      if (hookOptions?.onErrorCallback) {
        hookOptions.onErrorCallback(error, variables);
      }
    },
  });

  return mutation;
}
