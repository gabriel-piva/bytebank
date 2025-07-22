"use client";

import TransactionList from "@/app/dashboard/components/TransactionList/TransactionList";
import IconAvatar from "@/assets/icons/icon-avatar.svg";
import Loader from "@/components/ui/loader";
import { Account } from "@/types/accountEntities";
import { Transaction } from "@/types/transactionEntities";
import { User } from "@/types/userEntities";
import { ChevronsUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ExtractContentProps {
  user: User | null;
  account: Account | null;
  transactions: Transaction[] | null;
  onSetEditTransaction: (transaction: Transaction) => void;
}
export default function ExtractContent({
  account,
  user,
  transactions,
  onSetEditTransaction,
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

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      setShowScrollButton(scrollTop > 300);
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

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

// CSS personalizado para a barra de rolagem
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

  /* Garantindo que componentes ocupem toda a largura em dispositivos móveis */
  @media (max-width: 768px) {
    .transaction-list-container {
      width: 100% !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
`;

// Adiciona os estilos ao DOM
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}
