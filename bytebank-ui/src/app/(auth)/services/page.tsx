import { UnderConstruction } from "@/components/ui/under-construction";

export default function ServicesPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl bg-[var(--surface)] p-4 md:p-6">
      <UnderConstruction
        title="Serviços adicionais em desenvolvimento"
        message="Estamos trabalhando para expandir nosso catálogo de serviços. Em breve você terá acesso a diversas funcionalidades adicionais nesta seção."
      />
    </div>
  );
}
