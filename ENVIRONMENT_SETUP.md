# 🔧 Configuração de Ambiente - Bytebank

## Problema: Internal Server Error no Angular

Se você está recebendo **internal server error** ao acessar `/transfers`, o problema é que o **microfrontend Angular não está rodando**.

## 🚀 Soluções

### Solução 1: Script Automático (Recomendada)

Execute o script que criamos:

```bash
./start-production.sh
```

Este script irá:

- ✅ Verificar se as portas estão disponíveis
- ✅ Fazer build se necessário
- ✅ Iniciar API (porta 3003)
- ✅ Iniciar Angular microfrontend (porta 4201)
- ✅ Iniciar Next.js (porta 3000)

### Solução 2: Manual

Execute os comandos em terminais separados:

```bash
# Terminal 1 - API
cd bytebank-api
npm run dev

# Terminal 2 - Angular Microfrontend
cd bytebank-ui/microfrontends/transfers-mf
node serve.js

# Terminal 3 - Next.js
cd bytebank-ui
npm run start
```

### Solução 3: Usando os Scripts NPM

```bash
cd bytebank-ui

# Fazer build de tudo
npm run build:all

# Iniciar todos os serviços
npm run start:all
```

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` em `bytebank-ui/` com:

```env
# URL do microfrontend Angular
TRANSFERS_DOMAIN=http://localhost:4201

# URL da API
API_BASE_URL=http://localhost:3003

# Ambiente
NODE_ENV=production
```

## 🌐 URLs de Acesso

Após iniciar todos os serviços:

- **Aplicação principal:** http://localhost:3000
- **Angular (transfers):** http://localhost:3000/transfers
- **Angular (direto):** http://localhost:4201/transfers
- **API:** http://localhost:3003

## 🔍 Verificação de Problemas

### 1. Verificar se os serviços estão rodando:

```bash
# Verificar portas em uso
lsof -i :3000  # Next.js
lsof -i :3003  # API
lsof -i :4201  # Angular
```

### 2. Verificar se o build do Angular existe:

```bash
ls -la bytebank-ui/microfrontends/transfers-mf/dist/transfers-mf/browser/
```

### 3. Testar o Angular diretamente:

```bash
curl http://localhost:4201/transfers
```

## 🚨 Erros Comuns

1. **Porta já em uso:** Feche outros processos ou mude a porta
2. **Build não existe:** Execute `npm run build:all`
3. **Permissões:** Execute `chmod +x start-production.sh`

## 💡 Para Produção Real

Em um ambiente de produção real, você deveria:

1. **Usar um reverse proxy** (nginx, apache)
2. **Deployar cada serviço separadamente**
3. **Configurar TRANSFERS_DOMAIN** com a URL real do Angular
4. **Usar PM2 ou similar** para gerenciar processos
