"use client";

interface DashboardHeaderProps {
  name: string;
}

export default function DashboardHeader({ name }: DashboardHeaderProps) {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(currentDate);

  return (
    <div className="flex flex-col gap-3 font-(family-name:--font-space-grotesk) sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1 sm:space-y-2">
        <h3 className="text-lg tracking-wide text-[var(--color-text-link-hover)] sm:text-xl md:text-2xl">
          Olá, {name}! :]
        </h3>
        <h1 className="font-grotesk bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
          Bem vinda de volta!
        </h1>
      </div>
      <div className="flex items-start sm:items-end">
        <h4 className="font-grotesk text-[0.875rem] tracking-wide text-[var(--color-text-link-hover)] capitalize">
          {formattedDate}
        </h4>
      </div>
    </div>
  );
}
