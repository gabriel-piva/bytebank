// components/DeleteModal.tsx
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  itemName?: string;
}

export function DeleteModal({
  isOpen = false,
  onClose,
  onConfirmDelete,
  itemName,
}: DeleteModalProps) {
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
          Confirmar exclusão
        </h2>
        <p className="pb-4 text-sm text-[var(--color-text-secondary)]">
          Você tem certeza que deseja excluir {`"${itemName}"`}
          ?
          <br />
          Esta ação não pode ser desfeita.
        </p>
        <div className="flex justify-end gap-3">
          <Button type="submit" variant="outline" size="lg" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="destructive"
            size="lg"
            onClick={onConfirmDelete}
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}
