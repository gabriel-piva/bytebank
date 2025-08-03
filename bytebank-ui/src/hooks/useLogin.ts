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
      console.log("Login success - data received:", data);
      if (data && data.user && data.token) {
        console.log("Saving user data to localStorage");
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
        }

        console.log("Authenticating user in context");
        authenticateUser(data.user);

        console.log("Showing success toast");
        toast.success("Usuário autenticado!");

        console.log("Attempting to redirect to /home");
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
