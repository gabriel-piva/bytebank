# Multi-stage build for the entire stack
FROM node:20 AS ui-builder

WORKDIR /app/bytebank-ui

ARG NEXT_PUBLIC_API_URL
ARG TRANSFERS_DOMAIN
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV TRANSFERS_DOMAIN=${TRANSFERS_DOMAIN}

COPY bytebank-ui/package.json bytebank-ui/package-lock.json ./
RUN npm install

COPY bytebank-ui/ .
RUN npm run build:next

# Final stage - just the UI
FROM node:20 AS runner

WORKDIR /app

COPY bytebank-ui/package*.json ./
COPY --from=ui-builder /app/bytebank-ui/.next ./.next
COPY --from=ui-builder /app/bytebank-ui/public ./public
COPY --from=ui-builder /app/bytebank-ui/node_modules ./node_modules
COPY --from=ui-builder /app/bytebank-ui/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]