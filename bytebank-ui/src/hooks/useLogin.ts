import { login } from "@/api/authService";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface LoginCredentials {
  email: string;
  password: string;
}
export function useLogin() {
  const { authenticateUser } = useAuth();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      login(credentials.email, credentials.password),
    onSuccess: (data) => {
      if (data && data.user && data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        authenticateUser(data.user);
        toast.success("Usuário autenticado!");
        redirect("/home");
      }
    },
    onError: () => {
      toast.error("Falha no login.");
    },
  });
}
