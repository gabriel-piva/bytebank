# Configuração para Produção - Bytebank UI

## Arquitetura

Esta aplicação usa:

- **Next.js** como framework principal
- **Angular** como microfrontend para o dashboard de transferências (via iframe)

## Problema em Produção

Em desenvolvimento, o microfrontend Angular roda em `http://localhost:4201`, mas em produção isso não funcionará porque:

1. O iframe aponta para localhost
2. O servidor Angular não está rodando em produção

## Soluções

### Opção 1: Servir Angular e Next.js Separadamente (Recomendado)

1. **Configure as variáveis de ambiente**

   Crie um arquivo `.env.local` ou `.env.production` na raiz do projeto:

   ```env
   NEXT_PUBLIC_ANGULAR_MF_URL=https://seu-dominio-angular.com
   ```

2. **Faça o build de ambas aplicações**

   ```bash
   npm run build  # Isso faz build do Angular e Next.js
   ```

3. **Sirva o Angular separadamente**

   O build do Angular está em `microfrontends/transfers-mf/dist/transfers-mf/browser/`

   Você pode:

   - Hospedar em um CDN (Vercel, Netlify, AWS S3)
   - Usar um servidor Node.js com Express
   - Usar nginx para servir os arquivos estáticos

4. **Configure CORS no servidor Angular**

   O arquivo `serve-simple.js` já tem headers CORS configurados.

### Opção 2: Servir Tudo Junto (Mais Complexo)

1. Configure o Next.js para servir o conteúdo Angular como arquivos estáticos
2. Use rewrites no `next.config.ts` para redirecionar requisições

### Scripts Disponíveis

- `npm run dev:all` - Roda Next.js e Angular em desenvolvimento
- `npm run build` - Faz build de ambas aplicações
- `npm run start:all` - Roda ambas em produção (localmente)
- `npm run angular:build` - Faz build apenas do Angular
- `npm run angular:serve` - Serve o Angular compilado

## Testando Localmente em Produção

1. **Terminal 1 - API Backend**

   ```bash
   cd bytebank-api
   npm start
   ```

2. **Terminal 2 - Angular Microfrontend**

   ```bash
   cd bytebank-ui
   npm run angular:serve
   ```

3. **Terminal 3 - Next.js**
   ```bash
   cd bytebank-ui
   npm start
   ```

## Deploy em Produção Real

### Vercel/Netlify (Next.js)

1. Configure a variável de ambiente `NEXT_PUBLIC_ANGULAR_MF_URL`
2. Use o comando de build: `npm run build:next`

### Angular Microfrontend

1. Faça o build: `npm run angular:build`
2. Faça upload da pasta `dist/transfers-mf/browser/` para seu servidor/CDN
3. Configure CORS adequadamente

## Importante

- Sempre teste com builds de produção antes de fazer deploy
- Configure HTTPS em produção para ambas aplicações
- Considere usar um domínio/subdomínio separado para o Angular
- Monitore erros de CORS no console do navegador
