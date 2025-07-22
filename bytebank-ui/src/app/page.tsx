"use client";

import BalanceCard from "@/app/dashboard/components/BalanceCard/BalanceCard";
import DashboardHeader from "@/app/dashboard/components/DashboardHeader/DashboardHeader";
import ExtractContent from "@/app/dashboard/components/ExtractContent/ExtractContent";
import TransactionForm from "@/app/dashboard/components/TransactionForm/TransactionForm";
import Loader from "@/components/ui/loader";
import { UnderConstruction } from "@/components/ui/under-construction";
import { useAccountData } from "@/hooks/useAccountData";
import { useTransactionData } from "@/hooks/useTransactionsData";
import { useUserData } from "@/hooks/useUserData";
import { Transaction } from "@/types/transactionEntities";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") || "inicio";

  const userEmail = "alice@email.com";
  const { user, isLoading: isLoadingUser } = useUserData(userEmail);
  const {
    account,
    isLoading: isLoadingAccount,
    invalidateAccountQuery,
  } = useAccountData(user?.id);

  const { transactions, invalidateTransactionsQuery } = useTransactionData(
    account?.id
  );

  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);

  const handleSetTransactionToEdit = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
  };

  const handleClearTransactionToEdit = () => {
    setTransactionToEdit(null);
  };

  const renderMainContent = (section: string | null) => {
    switch (section) {
      case "inicio":
        return (
          <div className="flex w-full flex-col gap-4 max-md:pt-20">
            <div className="flex w-full flex-col gap-6 2xl:flex-row">
              <div className="flex flex-col rounded-xl bg-[var(--surface)] px-4 py-8 sm:px-8 md:px-10 lg:px-20 2xl:max-w-[65%] 2xl:basis-3/4">
                {isLoadingUser && <Loader />}

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
                      accountId={account.id}
                      transactionToEdit={transactionToEdit}
                      onSuccess={() => {
                        invalidateAccountQuery();
                        invalidateTransactionsQuery();
                        handleClearTransactionToEdit();
                      }}
                      onCancelEdit={handleClearTransactionToEdit}
                    />
                  )}
                </div>
              </div>
              <div className="flex h-[500px] rounded-xl bg-[var(--surface)] 2xl:h-auto 2xl:max-w-[35%] 2xl:basis-4/4">
                <ExtractContent
                  transactions={transactions}
                  account={account}
                  user={user}
                  onSetEditTransaction={handleSetTransactionToEdit}
                />
              </div>
            </div>
          </div>
        );
      case "transferencias":
        return (
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl bg-[var(--surface)] p-4 md:p-6">
            <UnderConstruction
              title="Transferências em desenvolvimento"
              message="Estamos aprimorando nossas funcionalidades de transferência para oferecer a melhor experiência. Esta seção estará disponível em breve."
            />
          </div>
        );
      case "investimentos":
        return (
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl bg-[var(--surface)] p-4 md:p-6">
            <UnderConstruction
              title="Investimentos em desenvolvimento"
              message="Nossa plataforma de investimentos está sendo desenvolvida com as melhores práticas do mercado. Em breve você poderá acompanhar e gerenciar seus investimentos aqui."
            />
          </div>
        );
      case "servicos":
        return (
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl bg-[var(--surface)] p-4 md:p-6">
            <UnderConstruction
              title="Serviços adicionais em desenvolvimento"
              message="Estamos trabalhando para expandir nosso catálogo de serviços. Em breve você terá acesso a diversas funcionalidades adicionais nesta seção."
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {renderMainContent(activeSection)}
    </div>
  );
}
