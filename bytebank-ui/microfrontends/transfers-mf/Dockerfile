FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN npm install
# RUN npm run build

# FROM nginx:alpine
# COPY --from=builder /app/dist/transfers-mf/browser /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY mime.types /etc/nginx/mime.types
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

RUN npm install @angular/cli -g
EXPOSE 4201
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4201", "--disable-host-check"]
