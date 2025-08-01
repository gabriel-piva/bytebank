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
import { Account } from "@/types/accountEntities";
import {
  Transaction,
  TransactionCategory,
  TransactionCategoryOption,
  TransactionCreate,
  TransactionEdit,
  TransactionFormState,
} from "@/types/transactionEntities";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AttachmentInput from "../AttachmentInput";

const EMPTY_FORM_STATE: TransactionFormState = {
  category: "entrada",
  amount: "",
  description: "",
  attachment: undefined,
};
const TRANSACTION_CATEGORIES: TransactionCategoryOption[] = [
  {
    id: "entrada",
    name: "Entrada",
  },
  {
    id: "saida",
    name: "Saída",
  },
] as const;

const DESCRIPTION_SUGGESTIONS = {
  entrada: [
    "Salário",
    "Freelance",
    "Investimentos",
    "Reembolso",
    "Presente",
    "Venda de item",
    "Rendimentos",
    "Transferência recebida",
  ],
  saida: [
    "Mercado",
    "Aluguel",
    "Conta de luz",
    "Internet",
    "Transporte",
    "Lazer",
    "Saúde",
    "Educação",
    "Transferência enviada",
  ],
};

interface TransactionFormProps {
  account: Account;
  onSuccess?: () => void;
  transactionToEdit?: Transaction | null;
  onCancelEdit?: () => void;
}
export default function TransactionForm({
  account,
  onSuccess: onFormSuccess,
  transactionToEdit,
  onCancelEdit,
}: TransactionFormProps) {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // * Handle Form State

  const [formState, setFormState] =
    useState<TransactionFormState>(EMPTY_FORM_STATE);
  const [initialEditState, setInitialEditState] =
    useState<TransactionFormState | null>(null);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // * Handle Mutations

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
  const isEditMode = !!transactionToEdit;

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // * Handle Form Initial State

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
        category: transactionToEdit.category,
        amount: formatCurrency(amountInCentsString),
        description: transactionToEdit.description || "",
        attachment: transactionToEdit.attachment,
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

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // * Handle Form Validation when Edit

  const hasFormChanged = () => {
    if (!isEditMode || !initialEditState) {
      return false;
    }
    return (
      formState.category !== initialEditState.category ||
      formState.amount !== initialEditState.amount ||
      formState.description !== initialEditState.description ||
      formState.attachment !== initialEditState.attachment
    );
  };
  const canSubmit = formState.category && formState.amount;
  const disableSubmitButton =
    !canSubmit || isPending || (isEditMode && !hasFormChanged());

  type FormErrors = {
    amount?: string;
  };
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // * Handle Submit Form

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disableSubmitButton) return;

    setFormErrors({});

    if (!formState.category || !formState.amount) return;
    const parsedAmount = parseFloat(
      formState.amount.replace(/\./g, "").replace(",", ".")
    );
    if (isNaN(parsedAmount)) {
      toast.error("Valor inválido.");
      setFormErrors({ amount: "Valor inválido" });
      return;
    }

    if (formState.category === "saida") {
      const accountBalance = parseFloat(account.balance);
      if (parsedAmount > accountBalance) {
        setFormErrors({
          amount: `Saldo insuficiente (Saldo atual: R$ ${account.balance})`,
        });
        setFormState((prev) => ({ ...prev, amount: "" }));
        toast.error("Saldo insuficiente para realizar esta transação.");
        return;
      }
    }

    let attachmentBase64: string | undefined;
    if (formState.attachment && formState.attachment instanceof File) {
      attachmentBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(formState.attachment as File);
      });
    }

    if (isEditMode && transactionToEdit) {
      const updatedData: TransactionEdit = {
        amount: `${parsedAmount}`,
        description: formState.description,
        category: formState.category as TransactionCategory,
        ...(attachmentBase64 && { attachment: attachmentBase64 }),
      };
      await requestEditTransaction({
        id: transactionToEdit.id,
        transactionData: updatedData,
      });
    } else {
      const transactionData: TransactionCreate = {
        account_id: account.id,
        amount: `${parsedAmount}`,
        description: formState.description,
        category: formState.category as TransactionCategory,
        ...(attachmentBase64 && { attachment: attachmentBase64 }),
      };
      await requestCreateTransaction(transactionData);
    }
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // * Handle Form Change

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors({});
    const value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      setFormState((prev) => ({ ...prev, amount: "" }));
      return;
    }
    setFormState((prev) => ({ ...prev, amount: formatCurrency(value) }));
  };
  const handleChange = (field: keyof TransactionFormState, value: string) => {
    setFormErrors({});
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
            value={formState.category}
            onValueChange={(value) => handleChange("category", value)}
          >
            <SelectTrigger
              id="transaction-category"
              className="h-44 w-full border-[var(--outline)] bg-[var(--surface)] text-sm"
            >
              <SelectValue placeholder={"Selecione o tipo de transação"} />
            </SelectTrigger>
            <SelectContent>
              {TRANSACTION_CATEGORIES.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
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
              className={`h-11 border-[var(--outline)] bg-[var(--surface)] pl-8 ${
                formErrors.amount ? "border-red-500" : ""
              }`}
            />
          </div>
          {formErrors.amount && (
            <p className="text-sm text-red-500">{formErrors.amount}</p>
          )}
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
            list="description-suggestions"
          />
          <datalist id="description-suggestions">
            {DESCRIPTION_SUGGESTIONS[
              formState.category as "entrada" | "saida"
            ].map((suggestion) => (
              <option key={suggestion} value={suggestion} />
            ))}
          </datalist>
        </div>

        <AttachmentInput
          value={
            formState.attachment instanceof File
              ? formState.attachment
              : undefined
          }
          onChange={(file) =>
            setFormState((prev) => ({ ...prev, attachment: file }))
          }
          existingAttachment={
            isEditMode ? transactionToEdit.attachment : undefined
          }
        />

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
