#!/bin/bash
echo "🚀 Iniciando Bytebank em modo produção..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para verificar se uma porta está em uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${RED}⚠️  Porta $1 já está em uso${NC}"
        return 1
    else
        echo -e "${GREEN}✅ Porta $1 disponível${NC}"
        return 0
    fi
}

# Verificar portas necessárias
echo -e "${BLUE}🔍 Verificando portas disponíveis...${NC}"
check_port 3000
check_port 3003  
check_port 4201

# Ir para a pasta do projeto
cd bytebank-ui

# Fazer build se necessário
echo -e "${BLUE}🔨 Verificando builds...${NC}"
if [ ! -d "microfrontends/transfers-mf/dist/transfers-mf/browser" ]; then
    echo -e "${BLUE}📦 Fazendo build do microfrontend Angular...${NC}"
    npm run build:transfers
fi

if [ ! -d ".next" ]; then
    echo -e "${BLUE}📦 Fazendo build do Next.js...${NC}"
    npm run build
fi

# Iniciar API em background
echo -e "${BLUE}🚀 Iniciando API (porta 3003)...${NC}"
cd ../bytebank-api
npm run dev &
API_PID=$!

cd ../bytebank-ui

# Iniciar microfrontend Angular em background
echo -e "${BLUE}🚀 Iniciando microfrontend Angular (porta 4201)...${NC}"
cd microfrontends/transfers-mf
node serve.js &
ANGULAR_PID=$!

cd ../..

# Aguardar um pouco para os serviços iniciarem
sleep 3

# Iniciar Next.js
echo -e "${BLUE}🚀 Iniciando Next.js (porta 3000)...${NC}"
npm run start &
NEXTJS_PID=$!

echo ""
echo -e "${GREEN}✅ Todos os serviços iniciados!${NC}"
echo ""
echo -e "${BLUE}📊 URLs de acesso:${NC}"
echo -e "   • Aplicação principal: ${GREEN}http://localhost:3000${NC}"
echo -e "   • Angular (transfers): ${GREEN}http://localhost:3000/transfers${NC}"
echo -e "   • API: ${GREEN}http://localhost:3003${NC}"
echo ""
echo -e "${BLUE}💡 Para parar todos os serviços, pressione Ctrl+C${NC}"

# Função para cleanup quando script for interrompido
cleanup() {
    echo ""
    echo -e "${BLUE}🛑 Parando todos os serviços...${NC}"
    kill $API_PID 2>/dev/null
    kill $ANGULAR_PID 2>/dev/null  
    kill $NEXTJS_PID 2>/dev/null
    echo -e "${GREEN}✅ Todos os serviços foram parados${NC}"
    exit 0
}

# Capturar Ctrl+C para cleanup
trap cleanup SIGINT SIGTERM

# Manter script rodando
wait