"use client";

import Loader from "@/components/ui/loader";
import { useAccountData } from "@/hooks/useAccountData";
import { useAuth } from "@/hooks/useAuth";
import { Transaction } from "@/types/transactionEntities";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import BalanceCard from "./components/BalanceCard/BalanceCard";
import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import ExtractContent from "./components/ExtractContent/ExtractContent";
import TransactionForm from "./components/TransactionForm/TransactionForm";

export default function HomePage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    account,
    isLoading: isLoadingAccount,
    invalidateAccountQuery,
  } = useAccountData(user?.id);

  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);
  const handleSetTransactionToEdit = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
  };
  const handleClearTransactionToEdit = () => {
    setTransactionToEdit(null);
  };

  return (
    <div className="flex w-full flex-col gap-4 max-md:pt-20">
      <div className="flex w-full flex-col gap-6 2xl:flex-row">
        <div className="flex flex-col rounded-xl bg-[var(--surface)] px-4 py-8 sm:px-8 md:px-10 lg:px-20 2xl:max-w-[65%] 2xl:basis-3/4">
        {user && <DashboardHeader name={user.name} />}

          <div className="mt-8 flex flex-1 flex-col gap-6">
            <div className="w-full">
              {isLoadingAccount && <Loader />}
              {user && account && (
                <BalanceCard
                  accountType={account.account_type}
                  cardNumber={account.card_number}
                  expirationDate={account.expiration_date}
                  balance={parseFloat(account.balance)}
                />
              )}
            </div>
            {account && (
              <TransactionForm
                account={account}
                transactionToEdit={transactionToEdit}
                onSuccess={() => {
                  invalidateAccountQuery();
                  handleClearTransactionToEdit();
                  queryClient.invalidateQueries({
                    queryKey: ["transactions"],
                  });
                }}
                onCancelEdit={handleClearTransactionToEdit}
              />
            )}
          </div>
        </div>

        <div className="flex h-[500px] rounded-xl bg-[var(--surface)] 2xl:h-auto 2xl:max-w-[35%] 2xl:basis-4/4">
          <ExtractContent
            account={account}
            user={user}
            onSetEditTransaction={handleSetTransactionToEdit}
          />
        </div>
      </div>
    </div>
  );
}
