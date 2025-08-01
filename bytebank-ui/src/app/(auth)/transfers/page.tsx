export default function TransfersPage() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col overflow-hidden rounded-xl bg-[var(--surface)]">
      <iframe
        src="http://localhost:4201"
        width="100%"
        height="100%"
        style={{
          border: "none",
          minHeight: "600px",
          borderRadius: "12px",
        }}
        title="Dashboard de Transferências"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
