import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function LogoutModal({
  isOpen = false,
  onClose,
  onConfirm,
  isLoading = false,
}: LogoutModalProps) {
  const handleConfirm = () => {
    onConfirm();
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
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <LogOut className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h2
              id="modal-title"
              className="text-lg font-semibold text-[var(--color-text)]"
            >
              Confirmar Logout
            </h2>
          </div>
        </div>

        <p className="mb-6 text-[var(--color-text-secondary)]">
          Tem certeza de que deseja sair da aplicação? Você precisará fazer
          login novamente para acessar sua conta.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isLoading ? "Saindo..." : "Confirmar Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
}
