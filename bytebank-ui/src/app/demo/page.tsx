export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            🏦 ByteBank Multi-Zone Platform
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Demonstração de arquitetura de micro-frontends usando Next.js
            Multi-Zones com integração Angular para o módulo de transferências.
          </p>
        </header>

        {/* Architecture Overview */}
        <section className="mb-8 rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            📐 Arquitetura Multi-Zone
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-blue-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-900">
                🔷 Zona Principal (Next.js)
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Dashboard principal</li>
                <li>• Autenticação e login</li>
                <li>• Configurações da conta</li>
                <li>• Roteamento e proxy</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-green-900">
                🅰️ Zona Angular (Micro-frontend)
              </h3>
              <ul className="space-y-2 text-green-800">
                <li>• Dashboard de transferências</li>
                <li>• Histórico de transações</li>
                <li>• Gráficos e relatórios</li>
                <li>• Aplicação independente</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="mb-8 rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            🚀 Navegação entre Zonas
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="text-center">
              <div className="mb-4 rounded-lg bg-blue-100 p-6">
                <h3 className="mb-2 text-lg font-semibold text-blue-900">
                  Next.js Zone
                </h3>
                <p className="mb-4 text-blue-700">
                  Você está aqui! Esta é a aplicação Next.js principal.
                </p>
                <span className="inline-block rounded-full bg-blue-200 px-3 py-1 text-sm text-blue-800">
                  Zona Atual
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="mb-4 rounded-lg bg-green-100 p-6">
                <h3 className="mb-2 text-lg font-semibold text-green-900">
                  Angular Zone
                </h3>
                <p className="mb-4 text-green-700">
                  Módulo de transferências construído em Angular.
                </p>
                <a
                  href="/transfers"
                  className="inline-block rounded-lg bg-green-500 px-6 py-3 font-medium text-white transition-colors hover:bg-green-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ir para Transfers →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            ⚙️ Detalhes Técnicos
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-700">
                Configuração Multi-Zone
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  • <strong>Rewrites:</strong> Roteamento automático
                  /transfers/*
                </li>
                <li>
                  • <strong>Asset Prefix:</strong> /transfers-static/ para
                  Angular
                </li>
                <li>
                  • <strong>CORS:</strong> Configurado para comunicação entre
                  zonas
                </li>
                <li>
                  • <strong>Hash Routing:</strong> Angular usa hash para evitar
                  conflitos
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-700">
                Scripts de Desenvolvimento
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  •{" "}
                  <code className="rounded bg-gray-100 px-2 py-1">
                    npm run dev:all
                  </code>{" "}
                  - Inicia ambas as zonas
                </li>
                <li>
                  •{" "}
                  <code className="rounded bg-gray-100 px-2 py-1">
                    npm run build:all
                  </code>{" "}
                  - Build de produção
                </li>
                <li>
                  •{" "}
                  <code className="rounded bg-gray-100 px-2 py-1">
                    npm run start:all
                  </code>{" "}
                  - Produção completa
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500">
          <p>
            💡 Esta implementação demonstra como construir micro-frontends
            escaláveis usando Next.js Multi-Zones com Angular.
          </p>
        </footer>
      </div>
    </div>
  );
}
