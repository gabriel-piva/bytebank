FROM node:20 AS builder

WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG TRANSFERS_DOMAIN
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV TRANSFERS_DOMAIN=${TRANSFERS_DOMAIN}

COPY package.json package-lock.json ./
RUN npm install

COPY . .
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
