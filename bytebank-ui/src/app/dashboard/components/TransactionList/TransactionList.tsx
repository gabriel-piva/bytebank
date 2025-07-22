import TransactionItem from "@/app/dashboard/components/TransactionItem/TransactionItem";
import { Transaction } from "@/types/transactionEntities";
import { User } from "@/types/userEntities";
import { WalletIcon } from "lucide-react";
import { useMemo } from "react";

interface TransactionListProps {
  user: User | null;
  transactions: Transaction[];
  onSetEditTransaction: (transaction: Transaction) => void;
}

export default function TransactionList({
  user,
  transactions,
  onSetEditTransaction,
}: TransactionListProps) {
  // Função para obter o nome do mês a partir da data
  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("pt-BR", {
      month: "long",
      timeZone: "UTC",
    });
    const year = date.getUTCFullYear();
    return `${month} de ${year}`;
  };

  // Ordena as transações por data (mais recente primeiro) e agrupa por mês
  const groupedTransactions = useMemo(() => {
    // Ordena transações por data (mais recente primeiro)
    const sortedTransactions = [...transactions].sort((a, b) => {
      return (
        new Date(b.transaction_date).getTime() -
        new Date(a.transaction_date).getTime()
      );
    });

    // Agrupa por mês
    const groups = sortedTransactions.reduce<Record<string, Transaction[]>>(
      (acc, transaction) => {
        const monthYear = getMonthName(transaction.transaction_date);
        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(transaction);
        return acc;
      },
      {}
    );

    // Converte para um array de { month, transactions }
    return Object.entries(groups).map(([month, transactions]) => ({
      month,
      transactions,
    }));
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-10">
        <p className="text-center text-gray-500">
          Nenhuma transação encontrada.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex items-center">
        <WalletIcon className="mr-2 h-5 w-5 text-[var(--color-text)]" />
        <h4 className="text-xl font-semibold text-[var(--color-text)]">
          Extrato
        </h4>
      </div>
      <div className="w-full">
        <div className="w-full">
          {groupedTransactions.map((group, index) => (
            <div key={group.month} className="mb-4 w-full">
              <h3 className="mb-2 text-base font-medium text-gray-700 capitalize">
                {group.month}
              </h3>
              <ul className="w-full space-y-1">
                {group.transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    user={user}
                    transaction={transaction}
                    onSetEditTransaction={onSetEditTransaction}
                  />
                ))}
              </ul>
              {index < groupedTransactions.length - 1 && (
                <div className="my-4 h-px w-full bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
