const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");

const authMiddleware = require("./middlewares/auth");

// Routes
const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");
const transactionRoutes = require("./routes/transaction");

const app = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));

app.use(cors());
app.use(express.json());

// Set Routes
app.use("/login", authRoutes);
app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

app.use("/api", authMiddleware);
app.use("/api", router);

const PORT = 3003;
app.listen(PORT, () => {
	console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
