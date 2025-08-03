const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4201;

// Middleware para adicionar headers que permitem iframe e CORS
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

// Servir arquivos estáticos do build Angular com prefixo
app.use(
  "/transfers-static",
  express.static(path.join(__dirname, "dist/transfers-mf/browser")),
);

// Servir a aplicação Angular sob o prefixo /transfers
app.use(
  "/transfers",
  express.static(path.join(__dirname, "dist/transfers-mf/browser")),
);

// Fallback para SPA - redirecionar rotas do transfers para index.html
app.get("/transfers/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/transfers-mf/browser/index.html"));
});

app.get("/transfers", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/transfers-mf/browser/index.html"));
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "transfers-mf" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Microfrontend Angular rodando em http://localhost:${PORT}`);
  console.log(`📊 Dashboard de transferências disponível!`);
});
