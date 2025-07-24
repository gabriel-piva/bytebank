const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 4201;
const STATIC_PATH = path.join(__dirname, "dist/transfers-mf/browser");

// Função para determinar o Content-Type baseado na extensão do arquivo
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
  };
  return mimeTypes[ext] || "application/octet-stream";
}

const server = http.createServer((req, res) => {
  // Headers para permitir iframe e CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader("Content-Security-Policy", "frame-ancestors *");

  let filePath = path.join(
    STATIC_PATH,
    req.url === "/" ? "index.html" : req.url,
  );

  // Se o arquivo não existir, servir index.html (SPA fallback)
  if (!fs.existsSync(filePath)) {
    filePath = path.join(STATIC_PATH, "index.html");
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Arquivo não encontrado");
      return;
    }

    const contentType = getContentType(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Microfrontend Angular rodando em http://localhost:${PORT}`);
  console.log(`📊 Dashboard de transferências disponível!`);
  console.log(`✅ Headers configurados para permitir iframe loading`);
});
