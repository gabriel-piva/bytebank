import { ConstructionIcon, HammerIcon, WrenchIcon } from "lucide-react";

interface UnderConstructionProps {
  title?: string;
  message?: string;
}

export function UnderConstruction({
  title = "Página em Construção",
  message = "Esta funcionalidade ainda está sendo desenvolvida. Em breve estará disponível.",
}: UnderConstructionProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <div className="mb-6 flex items-center justify-center gap-2 text-[var(--color-primary)]">
        <ConstructionIcon className="h-8 w-8" />
        <WrenchIcon className="h-7 w-7" />
        <HammerIcon className="h-6 w-6" />
      </div>

      <h2 className="mb-4 text-2xl font-bold text-[var(--color-text)]">
        {title}
      </h2>

      <p className="max-w-md text-[var(--color-text-secondary)]">{message}</p>

      <div className="mt-8 h-2 w-64 overflow-hidden rounded-full bg-gray-200">
        <div className="animate-progress h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"></div>
      </div>
    </div>
  );
}

// Adiciona a animação de progresso ao CSS global
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = `
    @keyframes progress {
      0% { width: 0%; }
      50% { width: 70%; }
      75% { width: 85%; }
      90% { width: 95%; }
      100% { width: 100%; }
    }
    .animate-progress {
      animation: progress 2.5s ease-in-out infinite alternate;
    }
  `;
  document.head.appendChild(styleElement);
}
