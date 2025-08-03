# Configuração Next.js Multi-Zones - Bytebank UI

## O que são Multi-Zones?

Next.js Multi-Zones permite que você tenha múltiplas aplicações Next.js (ou outras) trabalhando juntas como se fossem uma única aplicação. Cada "zona" é responsável por um conjunto de rotas.

## Arquitetura Atual

- **Zona Principal (Next.js)**: Responsável por todas as rotas exceto `/transfers/*`
- **Zona Angular**: Responsável pela rota `/transfers/*`

## Configuração Implementada

### 1. Next.config.ts

```typescript
async rewrites() {
  return [
    {
      source: "/transfers",
      destination: `${process.env.ANGULAR_MF_URL || "http://localhost:4201"}/transfers`,
    },
    {
      source: "/transfers/:path*",
      destination: `${process.env.ANGULAR_MF_URL || "http://localhost:4201"}/transfers/:path*`,
    },
  ];
}
```

### 2. Angular baseHref

No `angular.json`, configuramos:

```json
"baseHref": "/transfers/"
```

Isso garante que o Angular saiba que está rodando sob o path `/transfers`.

## Como Executar

### Desenvolvimento

1. **Terminal 1 - API Backend**

   ```bash
   cd bytebank-api
   npm start
   ```

2. **Terminal 2 - Angular Zone**

   ```bash
   cd bytebank-ui/microfrontends/transfers-mf
   npm start
   ```

3. **Terminal 3 - Next.js Main Zone**
   ```bash
   cd bytebank-ui
   npm run dev
   ```

### Produção

1. **Build Angular**

   ```bash
   cd bytebank-ui
   npm run angular:build
   ```

2. **Servir Angular (porta 4201)**

   ```bash
   npm run angular:serve
   ```

3. **Build e Servir Next.js**
   ```bash
   npm run build:next
   npm start
   ```

## Variáveis de Ambiente

Para produção, configure:

```env
# .env.production
ANGULAR_MF_URL=https://angular-zone.seu-dominio.com
```

## Problemas Comuns

### 1. "Application error: a client-side exception"

**Causas:**

- Angular não está rodando na porta 4201
- Configuração de CORS incorreta
- Problema de hidratação do React

**Soluções:**

- Verifique se o Angular está rodando: `npm run angular:serve`
- Verifique os logs do console do navegador
- Certifique-se de que o baseHref está correto

### 2. Página de Transfers mostra fallback

**Causa:** O rewrite não está funcionando

**Solução:**

- Verifique se o Angular está rodando
- Verifique a variável ANGULAR_MF_URL
- Reinicie o servidor Next.js

### 3. Recursos não carregam (CSS/JS)

**Causa:** BaseHref incorreto no Angular

**Solução:** Verifique se o `baseHref` no angular.json está como `/transfers/`

## Deploy em Produção

### Opção 1: Dois Servidores

1. Deploy Angular em um servidor/CDN (ex: Vercel, Netlify)
2. Deploy Next.js em outro servidor
3. Configure ANGULAR_MF_URL para apontar para o servidor Angular

### Opção 2: Mesmo Servidor (Nginx)

```nginx
server {
    listen 80;

    # Next.js
    location / {
        proxy_pass http://localhost:3000;
    }

    # Angular
    location /transfers {
        proxy_pass http://localhost:4201;
    }
}
```

## Vantagens de Multi-Zones

1. **Desenvolvimento Independente**: Times podem trabalhar em zonas diferentes
2. **Deploy Independente**: Cada zona pode ser deployada separadamente
3. **Tecnologias Mistas**: Permite usar Angular e React juntos
4. **Escalabilidade**: Cada zona pode escalar independentemente

## Considerações

- Multi-Zones adiciona complexidade
- Requer configuração cuidadosa de CORS e roteamento
- Para aplicações pequenas, considere migrar tudo para um único framework
