export default function TransfersPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Módulo de Transferências
          </h1>
          <p className="text-gray-600">
            O microfrontend de transferências será disponibilizado em breve.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="mb-2 font-medium text-blue-900">
              Funcionalidades em desenvolvimento:
            </h3>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Transferências PIX</li>
              <li>• Transferências TED</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
