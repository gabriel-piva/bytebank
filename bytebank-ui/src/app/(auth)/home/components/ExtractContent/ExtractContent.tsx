"use client";

import IconAvatar from "@/assets/icons/icon-avatar.svg";
import Loader from "@/components/ui/loader";
import InfiniteScrollLoader from "@/components/ui/infinite-scroll-loader";
import { Account } from "@/types/accountEntities";
import { Transaction } from "@/types/transactionEntities";
import { User } from "@/types/userEntities";
import { ChevronsUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import TransactionList from "../TransactionList/TransactionList";

interface ExtractContentProps {
  user: User | null;
  account: Account | null;
  transactions: Transaction[] | null;
  onSetEditTransaction: (transaction: Transaction) => void;
  // Novas props para scroll infinito
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

export default function ExtractContent({
  account,
  user,
  transactions,
  onSetEditTransaction,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  isLoading,
  isError,
  error,
}: ExtractContentProps) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1536); // 2xl breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      const scrollHeight = scrollContainerRef.current.scrollHeight;
      const clientHeight = scrollContainerRef.current.clientHeight;
      
      setShowScrollButton(scrollTop > 300);
      
      // Detectar quando chegou a 80% do scroll para carregar mais itens
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      // Ajustar o threshold para 70% para ser mais responsivo
      if (scrollPercentage >= 0.7 && hasNextPage && !isFetchingNextPage && fetchNextPage) {
        console.log("🚀 Carregando próxima página...");
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
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
            <p className="text-lg font-medium text-red-600 mb-2">
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

  if (!user || !account || !transactions) {
    return (
      <div className="px-12">
        <Loader />
      </div>
    );
  }

  return (
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
      </div>
      <div
        ref={scrollContainerRef}
        className={`scrollbar-custom w-full overflow-y-auto pr-1 ${isLargeScreen ? "h-[calc(100vh-10px)]" : "h-full"}`}
        onScroll={handleScroll}
      >
        <div className="w-full">
          <TransactionList
            user={user || null}
            transactions={transactions || []}
            onSetEditTransaction={onSetEditTransaction}
          />
          
          {/* Loader para carregamento de mais itens */}
          {isFetchingNextPage && (
            <InfiniteScrollLoader 
              message="Carregando mais transações..."
            />
          )}
          
          {/* Mensagem quando não há mais itens */}
          {!hasNextPage && transactions.length > 0 && (
            <div className="flex items-center justify-center py-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3">
                  <div className="w-full h-full border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  Você chegou ao final do extrato
                </p>
                <p className="text-xs text-gray-400 mt-1">
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
  );
}

const styles = `
  .scrollbar-custom::-webkit-scrollbar {
    width: 6px;
  }

  .scrollbar-custom::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }

  .scrollbar-custom::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  .scrollbar-custom::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  /* Para Firefox */
  .scrollbar-custom {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05);
  }

  /* Animação para o botão de voltar ao topo */
  .scroll-to-top-btn {
    animation: fadeIn 0.3s ease-in-out;
    z-index: 10;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Animação para o loader de scroll infinito */
  .infinite-scroll-loader {
    animation: slideInUp 0.5s ease-out;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Animação para as transações quando carregadas */
  .transaction-item {
    animation: fadeInScale 0.3s ease-out;
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Garantindo que componentes ocupem toda a largura em dispositivos móveis */
  @media (max-width: 768px) {
    .transaction-list-container {
      width: 100% !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
`;

if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}
