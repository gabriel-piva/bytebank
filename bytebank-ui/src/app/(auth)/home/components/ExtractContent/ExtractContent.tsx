"use client";

import IconAvatar from "@/assets/icons/icon-avatar.svg";
import InfiniteScrollLoader from "@/components/ui/infinite-scroll-loader";
import Loader from "@/components/ui/loader";
import { useTransactionsData } from "@/hooks/useTransactionsData";
import { Account } from "@/types/accountEntities";
import { Transaction, TransactionParams } from "@/types/transactionEntities";
import { User } from "@/types/userEntities";
import { ChevronsUp, LogOut } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { FilterModal } from "../FilterModal";
import { LogoutModal } from "../LogoutModal";
import TransactionList from "../TransactionList/TransactionList";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";

interface ExtractContentProps {
  user: User | null;
  account: Account | null;
  onSetEditTransaction: (transaction: Transaction) => void;
}
export default function ExtractContent({
  account,
  user,
  onSetEditTransaction,
}: ExtractContentProps) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const logout = useLogout();

  const [transactionParams, setTransactionParams] = useState<TransactionParams>(
    {
      pageSize: 12,
    }
  );

  const {
    allTransactions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useTransactionsData(account?.id, transactionParams);

  const handleApplyFilters = (newFilters: TransactionParams) => {
    if (newFilters.minAmount && newFilters.maxAmount) {
      const min = parseFloat(newFilters.minAmount);
      const max = parseFloat(newFilters.maxAmount);
      if (min > max) {
        toast.warning("O valor mínimo não pode ser maior que o máximo");
        return;
      }
    }
    setTransactionParams((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setIsFilterOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1536);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      setShowScrollButton(scrollTop > 50);

      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      const triggerDistance = 50;

      if (
        distanceFromBottom <= triggerDistance &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Loading inicial
  if (isLoading) {
    return (
      <div className="flex w-full flex-col overflow-hidden px-4 py-4 md:p-6">
        <div className="mb-4 flex w-full flex-row items-center justify-between border-b border-[var(--color-border)] pb-4">
          <div className="flex items-center">
            {user?.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt={user.name}
                width={44}
                height={44}
                className="mr-3 aspect-1/1 rounded-full object-cover"
                unoptimized={true}
              />
            ) : (
              <IconAvatar className="mr-3 size-[44px] stroke-current text-[var(--color-primary)]" />
            )}
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {account?.account_type}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
      </div>
    );
  }
  // Erro
  if (isError) {
    return (
      <div className="flex w-full flex-col overflow-hidden px-4 py-4 md:p-6">
        <div className="mb-4 flex w-full flex-row items-center justify-between border-b border-[var(--color-border)] pb-4">
          <div className="flex items-center">
            {user?.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt={user.name}
                width={44}
                height={44}
                className="mr-3 aspect-1/1 rounded-full object-cover"
                unoptimized={true}
              />
            ) : (
              <IconAvatar className="mr-3 size-[44px] stroke-current text-[var(--color-primary)]" />
            )}
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {account?.account_type}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="mb-2 text-lg font-medium text-red-600">
              Erro ao carregar extrato
            </p>
            <p className="text-sm text-gray-500">
              {error?.message || "Tente novamente em alguns instantes"}
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (!user || !account || allTransactions.length === 0) {
    return (
      <div className="px-12">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div
        className={`flex w-full flex-col overflow-hidden px-4 py-4 md:p-6 ${isLargeScreen ? "h-screen" : "h-full"}`}
      >
        <div className="mb-4 flex w-full flex-row items-center justify-between border-b border-[var(--color-border)] pb-4">
          <div className="flex items-center">
            {user.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt={user.name}
                width={44}
                height={44}
                className="mr-3 aspect-1/1 rounded-full object-cover"
                unoptimized={true}
              />
            ) : (
              <IconAvatar className="mr-3 size-[44px] stroke-current text-[var(--color-primary)]" />
            )}
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {account?.account_type}
              </p>
            </div>
          </div>
          <Button
            size="icon"
            className="rounded-full"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            <LogOut />
          </Button>
        </div>
        <div
          ref={scrollContainerRef}
          className={`scrollbar-custom w-full overflow-y-auto pr-1 ${isLargeScreen ? "h-[calc(100vh-10px)]" : "h-full"}`}
          onScroll={handleScroll}
        >
          <div className="w-full">
            <TransactionList
              openFilter={() => setIsFilterOpen(true)}
              transactionParams={transactionParams}
              transactions={allTransactions}
              onSetEditTransaction={onSetEditTransaction}
            />

            {isFetchingNextPage && (
              <InfiniteScrollLoader message="Carregando mais transações..." />
            )}
            {!hasNextPage && allTransactions.length > 0 && (
              <div className="flex items-center justify-center py-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">
                    Você chegou ao final do extrato
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Todas as transações foram carregadas
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="scroll-to-top-btn fixed right-6 bottom-20 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg transition-all hover:bg-[var(--color-secondary)] focus:outline-none"
            aria-label="Voltar ao topo"
          >
            <ChevronsUp className="size-6" />
          </button>
        )}
      </div>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialParams={transactionParams}
      />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          logout.mutate();
          setIsLogoutModalOpen(false);
        }}
        isLoading={logout.isPending}
      />
    </>
  );
}
