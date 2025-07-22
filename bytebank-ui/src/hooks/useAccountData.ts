import { getAccountsByUserId } from "@/api/accountService";
import { Account } from "@/types/accountEntities";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAccountData(userId: string | null | undefined) {
  const queryClient = useQueryClient();

  const queryResult = useQuery({
    queryKey: ["account", userId],
    queryFn: async (): Promise<Account | null> => {
      if (!userId) return null;
      const accountsData = await getAccountsByUserId(userId);
      return accountsData?.[0] || null;
    },
    enabled: !!userId,
  });

  const invalidateAccountQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["account", userId],
    });
  };

  return {
    ...queryResult,
    account: queryResult.data || null,
    invalidateAccountQuery,
  };
}
