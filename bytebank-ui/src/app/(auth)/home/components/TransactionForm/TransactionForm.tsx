"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import { useEditTransaction } from "@/hooks/useEditTransaction";
import { useTransactionCategoriesData } from "@/hooks/useTransactionCategoriesData";
import {
  Transaction,
  TransactionCreate,
  TransactionEdit,
  TransactionFormState,
} from "@/types/transactionEntities";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface TransactionFormProps {
  accountId: string;
  onSuccess?: () => void;
  transactionToEdit?: Transaction | null;
  onCancelEdit?: () => void;
}

const EMPTY_FORM_STATE: TransactionFormState = {
  categoryId: "",
  amount: "",
  description: "",
};

export default function TransactionForm({
  accountId,
  onSuccess: onFormSuccess,
  transactionToEdit,
  onCancelEdit,
}: TransactionFormProps) {
  const { transactionCategories, isLoading: isLoadingCategories } =
    useTransactionCategoriesData();

  const [formState, setFormState] =
    useState<TransactionFormState>(EMPTY_FORM_STATE);
  const [initialEditState, setInitialEditState] =
    useState<TransactionFormState | null>(null);

  const isEditMode = !!transactionToEdit;

  const handleMutationSuccess = () => {
    setFormState(EMPTY_FORM_STATE);
    setInitialEditState(null);
    if (onFormSuccess) onFormSuccess();
  };

  const {
    mutateAsync: requestCreateTransaction,
    isPending: isCreating,
    isError: isCreateError,
    reset: resetCreateMutation,
  } = useCreateTransaction({ onSuccess: handleMutationSuccess });

  const {
    mutateAsync: requestEditTransaction,
    isPending: isEditing,
    isError: isEditError,
    reset: resetEditMutation,
  } = useEditTransaction({ onSuccess: handleMutationSuccess });

  const isPending = isCreating || isEditing;
  const hasError = isCreateError || isEditError;

  useEffect(() => {
    return () => {
      resetCreateMutation();
      resetEditMutation();
    };
  }, [resetCreateMutation, resetEditMutation]);

  useEffect(() => {
    if (isEditMode && transactionToEdit) {
      let amountInCentsString = "";

      const numericValue = parseFloat(
        transactionToEdit.amount.replace(",", ".")
      );

      if (!isNaN(numericValue)) {
        amountInCentsString = String(Math.round(numericValue * 100));
      }

      const initialData = {
        categoryId: transactionToEdit.category_id || "",
        amount: formatCurrency(amountInCentsString) || "",
        description: transactionToEdit.description || "",
      };
      setFormState(initialData);
      setInitialEditState(initialData);
      resetCreateMutation();
    } else if (!isEditMode) {
      setFormState(EMPTY_FORM_STATE);
      setInitialEditState(null);
      resetEditMutation();
    }
  }, [transactionToEdit, isEditMode, resetCreateMutation, resetEditMutation]);

  const hasFormChanged = () => {
    if (!isEditMode || !initialEditState) {
      return false;
    }
    return (
      formState.categoryId !== initialEditState.categoryId ||
      formState.amount !== initialEditState.amount ||
      formState.description !== initialEditState.description
    );
  };

  const canSubmit = formState.categoryId && formState.amount;
  const disableSubmitButton =
    !canSubmit || isPending || (isEditMode && !hasFormChanged());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disableSubmitButton) return;

    if (!formState.categoryId || !formState.amount) return;

    const parsedAmount = parseFloat(
      formState.amount.replace(/\./g, "").replace(",", ".")
    );

    if (isNaN(parsedAmount)) {
      toast.error("Valor inválido.");
      return;
    }

    if (isEditMode && transactionToEdit) {
      const updatedData: TransactionEdit = {
        id: transactionToEdit.id,
        amount: parsedAmount,
        description: formState.description,
        categoryId: formState.categoryId,
        transactionDate: new Date().toISOString(),
      };
      await requestEditTransaction(updatedData);
    } else {
      const transactionData: TransactionCreate = {
        accountId,
        amount: parsedAmount,
        description: formState.description,
        categoryId: formState.categoryId,
        transactionDate: new Date().toISOString(),
      };
      await requestCreateTransaction(transactionData);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      setFormState((prev) => ({ ...prev, amount: "" }));
      return;
    }
    setFormState((prev) => ({ ...prev, amount: formatCurrency(value) }));
  };

  const handleChange = (field: keyof TransactionFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl bg-white p-4 shadow-md sm:p-6"
    >
      <h3 className="mb-6 text-base font-semibold text-[var(--color-text)] sm:text-lg">
        {isEditMode ? "Editar Transação" : "Nova Transação"}
      </h3>

      {hasError && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
          Ocorreu um erro ao {isEditMode ? "editar" : "criar"} a transação. Por
          favor, tente novamente.
        </div>
      )}

      <div className="space-y-5 sm:space-y-6">
        <div className="w-full space-y-2">
          <Label
            htmlFor="transaction-category"
            className="text-sm text-[var(--color-text-secondary)]"
          >
            {isEditMode ? "Alterar Tipo de Transação" : "Tipo de Transação"}
          </Label>
          <Select
            value={formState.categoryId}
            onValueChange={(value) => handleChange("categoryId", value)}
            disabled={isLoadingCategories || isPending}
          >
            <SelectTrigger
              id="transaction-category"
              className="h-44 w-full border-[var(--outline)] bg-[var(--surface)] text-sm"
            >
              <SelectValue
                placeholder={
                  isLoadingCategories
                    ? "Carregando..."
                    : "Selecione o tipo de transação"
                }
              />
            </SelectTrigger>
            {transactionCategories && transactionCategories.length > 0 && (
              <SelectContent>
                {transactionCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
        </div>

        <div className="w-full space-y-2">
          <Label
            htmlFor="transaction-value"
            className="text-sm text-[var(--color-text-secondary)]"
          >
            {isEditMode ? "Novo Valor" : "Valor"}
          </Label>
          <div className="relative">
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-[var(--color-text-secondary)]">
              R$
            </span>
            <Input
              type="text"
              id="transaction-value"
              value={formState.amount}
              onChange={handleAmountChange}
              placeholder="0,00"
              className="h-11 border-[var(--outline)] bg-[var(--surface)] pl-8"
            />
          </div>
        </div>

        <div className="w-full space-y-2">
          <Label
            htmlFor="transaction-description"
            className="text-sm text-[var(--color-text-secondary)]"
          >
            {isEditMode ? "Nova Descrição" : "Descrição"}
          </Label>
          <Input
            type="text"
            id="transaction-description"
            value={formState.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Ex: Pagamento de conta"
            className="h-11 border-[var(--outline)] bg-[var(--surface)]"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary-hover)]"
          size="lg"
          disabled={disableSubmitButton}
        >
          {isPending
            ? "Processando..."
            : isEditMode
              ? "Salvar Alterações"
              : "Concluir Transação"}
        </Button>

        {isEditMode && onCancelEdit && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (onCancelEdit) onCancelEdit();
            }}
            className="w-full"
            disabled={isPending}
          >
            Cancelar Edição
          </Button>
        )}
      </div>
    </form>
  );
}
