import { getUserByEmail } from "@/api/userService";
import { User } from "@/types/userEntities";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserData(email: string | null) {
  const queryClient = useQueryClient();

  const queryResult = useQuery({
    queryKey: ["user", email],
    queryFn: async (): Promise<User | null> => {
      if (!email) return null;
      return await getUserByEmail(email);
    },
    enabled: !!email,
  });

  const invalidateUserQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["user", email],
    });
  };

  return {
    ...queryResult,
    user: queryResult.data || null,
    invalidateUserQuery,
  };
}
