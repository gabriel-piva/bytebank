import { editTransaction } from "@/api/transactionService";
import { Transaction, TransactionEdit } from "@/types/transactionEntities";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseEditTransactionProps {
  onSuccess?: (data: Transaction) => void;
}

export function useEditTransaction({
  onSuccess: onMutationSuccess,
}: UseEditTransactionProps) {
  const mutation = useMutation({
    mutationFn: ({
      id,
      transactionData,
    }: {
      id: string;
      transactionData: TransactionEdit;
    }) => editTransaction(id, transactionData),
    onSuccess: (data) => {
      toast.success("Transação editada com sucesso!");
      if (onMutationSuccess) onMutationSuccess(data);
    },
    onError: (err) => {
      toast.error(
        `Falha ao editar transação: ${err.message || "Erro desconhecido"}`
      );
    },
  });

  return mutation;
}
