"use client";
import { DeleteModal } from "@/app/dashboard/components/DeleteModal/DeleteModal";
import IconArrowPositive from "@/assets/icons/icon-arrow-negative.svg";
import IconArrowNegative from "@/assets/icons/icon-arrow-positive.svg";
import IconDelete from "@/assets/icons/icon-delete.svg";
import IconEdit from "@/assets/icons/icon-edit.svg";
import Loader from "@/components/ui/loader";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";
import { Transaction } from "@/types/transactionEntities";
import { User } from "@/types/userEntities";
import { formatDisplayDateWithYear } from "@/utils/date/formatDisplayDate";
import { useState } from "react";

interface TransactionItemProps {
  user: User | null;
  transaction: Transaction;
  onSetEditTransaction: (transaction: Transaction) => void;
}

export default function TransactionItem({
  user,
  transaction,
  onSetEditTransaction,
}: TransactionItemProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);

  const { mutateAsync: requestDeleteTransaction, isPending } =
    useDeleteTransaction({
      userId: user?.id,
      onSuccessCallback: () => {
        handleCloseDeleteModal();
      },
      onErrorCallback: () => {
        handleCloseDeleteModal();
      },
    });

  const handleOpenDeleteModal = (item: Transaction) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleConfirmDeleteItem = () => {
    if (selectedItem) {
      requestDeleteTransaction({
        transactionId: selectedItem.id,
        accountId: selectedItem.account_id,
      });
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSetEditTransaction(transaction);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleOpenDeleteModal(transaction);
  };

  const isIncome = transaction.category_name === "Entrada";

  return (
    <li
      key={transaction.id}
      className={`flex w-full items-center justify-between rounded-lg p-3 transition-colors ${
        isIncome ? "hover:bg-green-50" : "hover:bg-red-50"
      }`}
    >
      {isPending && <Loader />}

      <div className="flex items-center gap-3 md:gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isIncome
              ? "bg-[#E8FFF3] text-[#14AE5C]"
              : "bg-[#FFE8E8] text-[#ED4A4C]"
          }`}
        >
          {isIncome ? (
            <IconArrowPositive className="size-[14px] stroke-current" />
          ) : (
            <IconArrowNegative className="size-[14px] stroke-current" />
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">
            {transaction.description || transaction.category_name}
          </span>
          <span className="text-xs text-gray-500">
            {formatDisplayDateWithYear(transaction.transaction_date)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <span
          className={`text-sm font-semibold whitespace-nowrap ${
            isIncome ? "text-[#14AE5C]" : "text-[#ED4A4C]"
          }`}
        >
          {isIncome ? "+" : "-"} R$ {transaction.amount.replace(".", ",")}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={handleEditClick}
            title={`Editar ${transaction.description}`}
            className="mr-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#2d68fd44] text-[#2D68FD] transition-colors duration-200 ease-in-out hover:bg-[#2d68fd66]"
          >
            <IconEdit className="size-[12px] stroke-current" />
          </button>
          <button
            onClick={handleDeleteClick}
            title={`Excluir ${transaction.description}`}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#ed4a4d4b] text-[#ED4A4C] transition-colors duration-200 ease-in-out hover:bg-[#ed4a4d70]"
          >
            <IconDelete className="size-[12px] stroke-current" />
          </button>
        </div>
      </div>

      {isModalOpen && selectedItem && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirmDelete={handleConfirmDeleteItem}
          itemName={selectedItem.description}
        />
      )}
    </li>
  );
}
