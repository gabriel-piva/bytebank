import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      // Simula uma operação assíncrona caso precise fazer logout no servidor no futuro
      return Promise.resolve();
    },
    onSuccess: () => {
      logout();
      toast.success("Logout realizado com sucesso!");
      redirect("/login");
    },
    onError: () => {
      toast.error("Erro ao realizar logout");
    },
  });
}
