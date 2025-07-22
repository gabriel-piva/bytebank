import { createTransaction } from "@/api/transactionService";
import { Transaction, TransactionCreate } from "@/types/transactionEntities";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseCreateTransactionProps {
  onSuccess?: (data: Transaction) => void;
}

export function useCreateTransaction({
  onSuccess: onMutationSuccess,
}: UseCreateTransactionProps = {}): UseMutationResult<
  Transaction,
  Error,
  TransactionCreate
> {
  const mutation = useMutation<Transaction, Error, TransactionCreate>({
    mutationFn: (transactionData: TransactionCreate) =>
      createTransaction(transactionData),
    onSuccess: (data) => {
      toast.success("Transação incluída com sucesso!");
      if (onMutationSuccess) onMutationSuccess(data);
    },
    onError: (err) => {
      toast.error(
        `Falha ao incluir transação: ${err.message || "Erro desconhecido"}`
      );
    },
  });

  return mutation;
}
