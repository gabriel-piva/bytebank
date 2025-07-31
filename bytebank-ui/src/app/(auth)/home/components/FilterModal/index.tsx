import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionParams } from "@/types/transactionEntities";
import { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: TransactionParams) => void;
  initialParams: TransactionParams;
}

export function FilterModal({
  isOpen = false,
  onClose,
  onApplyFilters,
  initialParams,
}: FilterModalProps) {
  const [filters, setFilters] = useState<TransactionParams>(initialParams);

  const handleChange = (field: keyof TransactionParams, value: any) => {
    if (field === "category" && value === "all") value = undefined;
    setFilters((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
    onClose();
  };
  const handleReset = () => {
    setFilters({
      order: undefined,
      category: undefined,
      minAmount: undefined,
      maxAmount: undefined,
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
        aria-hidden="true"
      ></div>

      <div
        className={`w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2
          id="modal-title"
          className="mb-6 text-base font-semibold text-[var(--color-text)] sm:text-lg"
        >
          Filtrar Transações
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Ordenar por</Label>
            <Select
              value={filters.order}
              onValueChange={(value) => handleChange("order", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a ordem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Mais recentes primeiro</SelectItem>
                <SelectItem value="asc">Mais antigas primeiro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tipo de transação</Label>
            <RadioGroup
              value={filters.category ? (filters.category as string) : "all"}
              onValueChange={(value) => handleChange("category", value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="entrada" id="entrada" />
                <Label htmlFor="entrada">Entradas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="saida" id="saida" />
                <Label htmlFor="saida">Saídas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">Todas</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valor mínimo</Label>
              <Input
                type="number"
                placeholder="R$ 0,00"
                value={filters.minAmount || ""}
                onChange={(e) => handleChange("minAmount", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Valor máximo</Label>
              <Input
                type="number"
                placeholder="R$ 10.000,00"
                value={filters.maxAmount || ""}
                onChange={(e) => handleChange("maxAmount", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleReset}
              className="text-red-500 hover:text-red-600"
            >
              Limpar filtros
            </Button>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Aplicar filtros</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
