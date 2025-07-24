const express = require("express");
const path = require("path");
const app = express();
const PORT = 4201;

// Middleware para adicionar headers que permitem iframe
app.use((req, res, next) => {
  res.header("X-Frame-Options", "ALLOWALL");
  res.header("Content-Security-Policy", "frame-ancestors *");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

// Servir arquivos estáticos do build Angular
app.use(express.static(path.join(__dirname, "dist/transfers-mf/browser")));

// Fallback para SPA - redirecionar todas as rotas para index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/transfers-mf/browser/index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Microfrontend Angular rodando em http://localhost:${PORT}`);
  console.log(`📊 Dashboard de transferências disponível!`);
});
