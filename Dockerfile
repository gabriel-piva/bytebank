FROM node:20 AS angular-builder

WORKDIR /app/angular

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiar e buildar o microfrontend Angular
COPY bytebank-ui/microfrontends/transfers-mf/package.json bytebank-ui/microfrontends/transfers-mf/package-lock.json ./
RUN npm install

COPY bytebank-ui/microfrontends/transfers-mf/ .
RUN ng build --configuration=production

FROM node:20 AS builder

WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG TRANSFERS_DOMAIN
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV TRANSFERS_DOMAIN=${TRANSFERS_DOMAIN}

# Copiar package.json do frontend
COPY bytebank-ui/package.json bytebank-ui/package-lock.json ./
RUN npm install

# Copiar código do frontend
COPY bytebank-ui/ .

# Copiar o Angular buildado para pasta estática do Next.js
COPY --from=angular-builder /app/angular/dist/transfers-mf/ ./public/transfers/

RUN npm run build:next

FROM node:20 AS runner

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
