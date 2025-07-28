import { UnderConstruction } from "@/components/ui/under-construction";

export default function InvestmentsPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl bg-[var(--surface)] p-4 md:p-6">
      <UnderConstruction
        title="Investimentos em desenvolvimento"
        message="Nossa plataforma de investimentos está sendo desenvolvida com as melhores práticas do mercado. Em breve você poderá acompanhar e gerenciar seus investimentos aqui."
      />
    </div>
  );
}
