import { Button } from "@/components/ui/button";
import { Transaction, TransactionParams } from "@/types/transactionEntities";
import { Filter, WalletIcon } from "lucide-react";
import { useMemo } from "react";
import TransactionItem from "../TransactionItem/TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onSetEditTransaction: (transaction: Transaction) => void;
  openFilter: () => void;
  transactionParams: TransactionParams;
}
export default function TransactionList({
  transactions,
  onSetEditTransaction,
  openFilter,
  transactionParams,
}: TransactionListProps) {
  const hasActiveFilters =
    transactionParams.category ||
    transactionParams.minAmount ||
    transactionParams.maxAmount ||
    transactionParams.order === "asc";

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

  // Ordena as transações por data e agrupa por mês
  const groupedTransactions = useMemo(() => {
    // Ordena transações por data
    const sortedTransactions = [...transactions].sort((a, b) => {
      const sorted =
        transactionParams.order === "asc"
          ? new Date(a.transaction_date).getTime() -
            new Date(b.transaction_date).getTime()
          : new Date(b.transaction_date).getTime() -
            new Date(a.transaction_date).getTime();
      return sorted;
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
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center">
          <WalletIcon className="mr-2 h-5 w-5 text-[var(--color-text)]" />
          <h4 className="text-xl font-semibold text-[var(--color-text)]">
            Extrato
          </h4>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={openFilter}
          className="gap-2 border border-[var(--color-border)] hover:bg-[var(--color-primary-light)]"
        >
          <Filter className="size-4" />
          Filtrar
        </Button>
      </div>

      {hasActiveFilters && (
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {transactionParams.order && transactionParams.order !== "desc" && (
            <span className="inline-flex items-center rounded-full bg-[var(--surface-hover)] px-3 py-1 text-sm font-semibold text-[var(--color-tertiary)]">
              <span className="mr-1 font-medium">Ordem:</span>
              {transactionParams.order === "asc"
                ? "Mais antigas"
                : "Mais recentes"}
            </span>
          )}

          {transactionParams.category && (
            <span className="inline-flex items-center rounded-full bg-[var(--surface-hover)] px-3 py-1 text-sm font-semibold text-[var(--color-tertiary)]">
              <span className="mr-1 font-medium">Tipo:</span>
              {transactionParams.category === "entrada" ? "Entradas" : "Saídas"}
            </span>
          )}

          {transactionParams.minAmount && (
            <span className="inline-flex items-center rounded-full bg-[var(--surface-hover)] px-3 py-1 text-sm font-semibold text-[var(--color-tertiary)]">
              <span className="mr-1 font-medium">Mínimo:</span>
              R$ {parseFloat(transactionParams.minAmount).toFixed(2)}
            </span>
          )}

          {transactionParams.maxAmount && (
            <span className="inline-flex items-center rounded-full bg-[var(--surface-hover)] px-3 py-1 text-sm font-semibold text-[var(--color-tertiary)]">
              <span className="mr-1 font-medium">Máximo:</span>
              R$ {parseFloat(transactionParams.maxAmount).toFixed(2)}
            </span>
          )}
        </div>
      )}

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
  );
}
