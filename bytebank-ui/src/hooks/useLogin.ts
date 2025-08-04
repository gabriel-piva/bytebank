import { login } from "@/api/authService";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LoginCredentials {
  email: string;
  password: string;
}
export function useLogin() {
  const { authenticateUser } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      login(credentials.email, credentials.password),
    onSuccess: (data) => {
      if (data && data.user && data.token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
        }
        authenticateUser(data.user);
        toast.success("Usuário autenticado!");
        router.push("/home");
      } else {
        console.error("Invalid data structure received:", data);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
}
