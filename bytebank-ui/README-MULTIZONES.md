# 🏦 ByteBank Multi-Zones Implementation

## 📋 Visão Geral

Esta implementação demonstra como integrar Angular com Next.js usando a arquitetura **Multi-Zones** do Next.js. O sistema é dividido em duas zonas principais:

- **Zona Principal (Next.js)**: Dashboard, autenticação, configurações
- **Zona Angular**: Módulo de transferências com dashboard e histórico

## 🏗️ Arquitetura

### Estrutura de Zonas

```
bytebank-ui/
├── src/                          # Zona Principal (Next.js)
│   ├── app/
│   ├── components/
│   └── middleware.ts            # Roteamento entre zonas
├── microfrontends/
│   └── transfers-mf/           # Zona Angular
│       ├── src/app/
│       ├── angular.json
│       └── serve.js           # Servidor Express para Angular
└── next.config.ts             # Configuração de rewrites
```

### Roteamento

- **`/`** → Zona Next.js (redireciona baseado na autenticação)
- **`/demo`** → Zona Next.js (página de demonstração Multi-Zones)
- **`/login`** → Zona Next.js (autenticação)
- **`/home`** → Zona Next.js (dashboard do usuário autenticado)
- **`/transfers/*`** → Zona Angular (transferências)
- **`/transfers-static/*`** → Assets estáticos do Angular

## ⚙️ Configuração Implementada

### 1. Angular Zone Configuration

#### `angular.json`

```json
{
  "build": {
    "options": {
      "baseHref": "/transfers/",
      "deployUrl": "/transfers-static/"
    }
  }
}
```

#### `app.config.ts`

```typescript
provideRouter(
  routes,
  withEnabledBlockingInitialNavigation(),
  withHashLocation() // Evita conflitos de roteamento
);
```

### 2. Next.js Configuration

#### `next.config.ts`

```typescript
async rewrites() {
  return {
    beforeFiles: [
      {
        source: '/transfers/:path*',
        destination: `${process.env.TRANSFERS_DOMAIN}/transfers/:path*`,
      },
      {
        source: '/transfers-static/:path*',
        destination: `${process.env.TRANSFERS_DOMAIN}/transfers-static/:path*`,
      },
    ],
  };
}
```

#### `middleware.ts`

```typescript
// Configuração de CORS para comunicação entre zonas
if (pathname.startsWith("/transfers")) {
  response.headers.set("Access-Control-Allow-Origin", transfersDomain);
}
```

### 3. Angular Server Configuration

#### `serve.js`

```javascript
// Servir arquivos estáticos com prefixo
app.use('/transfers-static', express.static(...));
app.use('/transfers', express.static(...));

// SPA fallback
app.get("/transfers*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/transfers-mf/browser/index.html"));
});
```

## 🚀 Como Executar

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Instalar dependências do Angular
cd microfrontends/transfers-mf && npm install && cd ../..

# Executar ambas as zonas
npm run dev:all
```

### Produção

```bash
# Build completo
npm run build:all

# Executar em produção
npm run start:all
```

### Scripts Disponíveis

- **`npm run dev:all`** - Inicia Next.js (porta 3000) + Angular (porta 4201)
- **`npm run dev:transfers`** - Apenas a zona Angular
- **`npm run build:all`** - Build de produção de ambas as zonas
- **`npm run start:all`** - Execução de produção completa

## 🌐 URLs de Acesso

- **Next.js (página principal)**: http://localhost:3000
- **Demonstração Multi-Zones**: http://localhost:3000/demo
- **Angular (direto)**: http://localhost:4201
- **Angular (via proxy)**: http://localhost:3000/transfers

## 📁 Estrutura Angular

### Componentes Criados

```
src/app/
├── app.ts                      # Componente raiz com navegação
├── app.config.ts              # Configuração do Angular
├── app.routes.ts              # Roteamento interno
└── components/
    ├── dashboard/             # Dashboard de transferências
    │   └── dashboard.component.ts
    └── history/              # Histórico de transações
        └── history.component.ts
```

### Rotas Angular

- **`/transfers#/dashboard`** - Dashboard principal
- **`/transfers#/history`** - Histórico de transferências

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
# Angular Transfers Microfrontend Domain
TRANSFERS_DOMAIN=http://localhost:4201
```

## 📊 Benefícios da Implementação

### 1. **Independência de Desenvolvimento**

- Equipes podem trabalhar separadamente
- Tecnologias diferentes por zona
- Deploy independente

### 2. **Escalabilidade**

- Facilita adição de novas zonas
- Build times menores por zona
- Manutenção simplificada

### 3. **Performance**

- Lazy loading entre zonas
- Cache otimizado por zona
- Bundle splitting automático

### 4. **Flexibilidade**

- Versionamento independente
- Rollback granular
- A/B testing por zona

## 🛠️ Próximos Passos

1. **Comunicação entre Zonas**

   - Implementar shared state management
   - Events bus para comunicação

2. **Deploy e CI/CD**

   - Pipeline separado por zona
   - Versionamento automático

3. **Monitoramento**

   - Métricas por zona
   - Error tracking separado

4. **Shared Components**
   - Design system compartilhado
   - Componentes base comuns

## ⚠️ Considerações Importantes

- **Navegação entre zonas**: Hard navigation (recarrega página)
- **Estado compartilhado**: Requer implementação adicional
- **SEO**: Configurar adequadamente para cada zona
- **Performance**: Monitorar carregamento inicial de cada zona

## 🔍 Debug e Troubleshooting

### Logs de Desenvolvimento

O middleware inclui logs para debug:

```
🔄 Middleware: /transfers/dashboard
🚀 Microfrontend Angular rodando em http://localhost:4201
```

### Problemas Comuns

1. **CORS errors**: Verificar configuração do middleware
2. **Assets não carregam**: Conferir `deployUrl` no Angular
3. **Roteamento não funciona**: Verificar `baseHref` e hash location

---

Esta implementação fornece uma base sólida para arquiteturas de micro-frontends escaláveis usando Next.js Multi-Zones com Angular. 🚀
