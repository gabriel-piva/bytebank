import { deleteTransaction as apiDeleteTransaction } from "@/api/transactionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => apiDeleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["account"],
      });
      toast.success("Transação excluída com sucesso!");
    },
    onError: (error) => {
      toast.error(`Falha ao excluir transação.`);
      console.log(
        `Falha ao excluir transação: ${error.message || "Erro desconhecido"}`
      );
    },
  });

  return mutation;
}
