const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { readDB, writeDB } = require("../utils/db");
const { updateAccountBalance } = require("../utils/balance");

// GET
router.get("/accounts/:accountId", authMiddleware, (req, res) => {
	const db = readDB();
	const { accountId } = req.params;
	const transactions = db.transactions.filter(t => t.account_id === accountId);
	res.json(transactions);
});

// GET extrato paginação, filtro e ordenação
router.get("/extrato/transacoes", authMiddleware, (req, res) => {
  const db = readDB();
  const { accountId, page = 1, pageSize = 12 } = req.query;
  if (!accountId) {
    return res.status(400).json({ error: "accountId é obrigatório." });
  }
  
  // Filtro por conta
  let transactions = db.transactions.filter(t => t.account_id === accountId);
  
  // Filtro para excluir categorias investment e transfer
  transactions = transactions.filter(t => !["investment", "transfer"].includes(t.category));
  
  // Ordenação por data desc
  transactions = transactions.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date));
  
  // Paginação
  const pageNum = parseInt(page, 10);
  const size = parseInt(pageSize, 10);
  const start = (pageNum - 1) * size;
  const end = start + size;
  const paginated = transactions.slice(start, end);
  
  res.json({
    data: paginated,
    total: transactions.length, // Total após filtro
    page: pageNum,
    pageSize: size
  });
});

// POST
router.post("/", authMiddleware, (req, res) => {
	const db = readDB();

	const { account_id, amount, description, category } = req.body;
	if (!account_id || !amount || !description || !category) {
		return res.status(400).json({ error: "Campos obrigatórios ausentes." });
	}

	const accountIndex = db.accounts.findIndex(acc => acc.id === account_id);
	if (accountIndex === -1) return { error: "Conta não encontrada." };
	const account = db.accounts[accountIndex];

	const updateResult = updateAccountBalance(account, amount, category);
	if (updateResult.error) return res.status(400).json({ error: updateResult.error });

	const newTransaction = {
		id: Date.now().toString(),
		account_id,
		amount: parseFloat(amount).toFixed(2),
		description,
		category,
		transaction_date: new Date().toISOString()
	};

	db.transactions.push(newTransaction);
	db.accounts[accountIndex].balance = updateResult.account.balance;
	writeDB(db);

	res.status(201).json(newTransaction);
});

// PUT
router.put("/:id", authMiddleware, (req, res) => {
	const db = readDB();
	const id = req.params.id;
	const { amount, description, category } = req.body;

	const transactionIndex = db.transactions.findIndex(t => t.id === id);
	if (transactionIndex === -1)
		return res.status(404).json({ error: "Transação não encontrada." });
	const transaction = db.transactions[transactionIndex];

	const accountIndex = db.accounts.findIndex(acc => acc.id === transaction.account_id);
	if (accountIndex === -1) return res.status(404).json({ error: "Conta não encontrada." });
	const account = db.accounts[accountIndex];

	const revertResult = updateAccountBalance(
		account,
		transaction.amount,
		transaction.category,
		true
	);
	if (revertResult.error) return res.status(400).json({ error: revertResult.error });
	db.accounts[accountIndex].balance = revertResult.account.balance;

	const applyResult = updateAccountBalance(account, amount, category);
	if (applyResult.error) return res.status(400).json({ error: applyResult.error });
	db.accounts[accountIndex].balance = applyResult.account.balance;

	const updatedTransaction = {
		...transaction,
		amount: parseFloat(amount).toFixed(2),
		description,
		category,
		updated_at: new Date().toISOString()
	};
	db.transactions[transactionIndex] = updatedTransaction;

	writeDB(db);
	res.status(200).json(transaction);
});

// DELETE
router.delete("/:id", authMiddleware, (req, res) => {
	const db = readDB();
	const id = req.params.id;

	const transactionIndex = db.transactions.findIndex(t => t.id === id);
	if (transactionIndex === -1)
		return res.status(404).json({ error: "Transação não encontrada." });
	const transaction = db.transactions[transactionIndex];

	const accountIndex = db.accounts.findIndex(acc => acc.id === transaction.account_id);
	if (accountIndex === -1) return res.status(404).json({ error: "Conta não encontrada." });
	const account = db.accounts[accountIndex];

	const revertResult = updateAccountBalance(
		account,
		transaction.amount,
		transaction.category,
		true
	);
	if (revertResult.error) return res.status(400).json({ error: revertResult.error });

	db.accounts[accountIndex].balance = revertResult.account.balance;
	db.transactions.splice(transactionIndex, 1);

	writeDB(db);
	res.status(204).send();
});

module.exports = router;
