const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { readDB, writeDB } = require("../utils/db");
const { updateAccountBalance } = require("../utils/balance");

// GET ALL TRANSACTIONS
router.get("/all", authMiddleware, (req, res) => {
  const db = readDB();
  const { order = "desc", category, maxAmount, minAmount } = req.query;

  // Get user's accounts
  const userAccounts = db.accounts.filter((acc) => acc.user_id === req.userId);
  const userAccountIds = userAccounts.map((acc) => acc.id);

  // Get all transactions from user's accounts
  let transactions = db.transactions.filter((t) =>
    userAccountIds.includes(t.account_id)
  );

  // Filters
  if (category) {
    transactions = transactions.filter((t) => t.category === category);
  }
  if (minAmount) {
    const min = parseFloat(minAmount);
    transactions = transactions.filter((t) => parseFloat(t.amount) >= min);
  }
  if (maxAmount) {
    const max = parseFloat(maxAmount);
    transactions = transactions.filter((t) => parseFloat(t.amount) <= max);
  }

  // Order
  transactions = transactions.sort((a, b) => {
    const dateA = new Date(a.transaction_date);
    const dateB = new Date(b.transaction_date);
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });

  res.json({
    transactions,
    totalTransactions: transactions.length,
  });
});

// GET BY ACCOUNT
router.get("/accounts/:accountId", authMiddleware, (req, res) => {
  const db = readDB();
  const { accountId } = req.params;
  const {
    page = 1,
    pageSize = 12,
    order = "desc",
    category,
    maxAmount,
    minAmount,
  } = req.query;

  // Transactions By Account
  let transactions = db.transactions.filter((t) => t.account_id === accountId);

  // Params Validation
  const pageNum = Math.max(1, parseInt(page)) || 1;
  const size = Math.min(Math.max(1, parseInt(pageSize)) || 12, 200);

  // Filters
  if (category) {
    transactions = transactions.filter((t) => t.category === category);
  }
  if (minAmount) {
    const min = parseFloat(minAmount);
    transactions = transactions.filter((t) => parseFloat(t.amount) >= min);
  }
  if (maxAmount) {
    const max = parseFloat(maxAmount);
    transactions = transactions.filter((t) => parseFloat(t.amount) <= max);
  }

  // Order
  transactions = transactions.sort((a, b) => {
    const dateA = new Date(a.transaction_date);
    const dateB = new Date(b.transaction_date);
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Pagination
  const start = (pageNum - 1) * size;
  const end = start + size;
  const paginatedTransactions = transactions.slice(start, end);

  const totalTransactions = transactions.length;
  const totalPages = Math.ceil(totalTransactions / size);

  res.json({
    transactions: paginatedTransactions,
    pagination: {
      page: pageNum,
      totalPages: totalPages,
      totalTransactions: totalTransactions,
    },
  });
});

// POST
router.post("/", authMiddleware, (req, res) => {
  const db = readDB();

  const { account_id, amount, description, category, attachment } = req.body;

  // Field Validation
  if (!account_id || !amount || !category) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }
  if (attachment) {
    const MAX_BASE64_SIZE = 100 * 1024;
    const base64Size = Buffer.byteLength(attachment, "utf8");

    if (base64Size > MAX_BASE64_SIZE) {
      return res
        .status(400)
        .json({ error: "Comprovante muito grande (máx. 100KB)." });
    }
  }

  const accountIndex = db.accounts.findIndex((acc) => acc.id === account_id);
  if (accountIndex === -1) return { error: "Conta não encontrada." };
  const account = db.accounts[accountIndex];

  const updateResult = updateAccountBalance(account, amount, category);
  if (updateResult.error)
    return res.status(400).json({ error: updateResult.error });

  const newTransaction = {
    id: Date.now().toString(),
    account_id,
    amount: parseFloat(amount).toFixed(2),
    description,
    category,
    transaction_date: new Date().toISOString(),
    ...(attachment !== undefined && { attachment }),
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
  const { amount, description, category, attachment } = req.body;

  const transactionIndex = db.transactions.findIndex((t) => t.id === id);
  if (transactionIndex === -1)
    return res.status(404).json({ error: "Transação não encontrada." });
  const transaction = db.transactions[transactionIndex];

  const accountIndex = db.accounts.findIndex(
    (acc) => acc.id === transaction.account_id
  );
  if (accountIndex === -1)
    return res.status(404).json({ error: "Conta não encontrada." });
  const account = db.accounts[accountIndex];

  if (attachment) {
    const MAX_BASE64_SIZE = 100 * 1024;
    const base64Size = Buffer.byteLength(attachment, "utf8");

    if (base64Size > MAX_BASE64_SIZE) {
      return res
        .status(400)
        .json({ error: "Comprovante muito grande (máx. 100KB)." });
    }
  }

  const revertResult = updateAccountBalance(
    account,
    transaction.amount,
    transaction.category,
    true
  );
  if (revertResult.error)
    return res.status(400).json({ error: revertResult.error });
  db.accounts[accountIndex].balance = revertResult.account.balance;

  const applyResult = updateAccountBalance(account, amount, category);
  if (applyResult.error)
    return res.status(400).json({ error: applyResult.error });
  db.accounts[accountIndex].balance = applyResult.account.balance;

  let updatedAttachment = transaction.attachment;
  if (!attachment) {
    updatedAttachment = undefined;
  } else if (attachment && attachment !== transaction.attachment) {
    updatedAttachment = attachment;
  }

  const updatedTransaction = {
    ...transaction,
    amount: parseFloat(amount).toFixed(2),
    description,
    category,
    attachment: updatedAttachment,
  };
  db.transactions[transactionIndex] = updatedTransaction;

  writeDB(db);
  res.status(200).json(transaction);
});

// DELETE
router.delete("/:id", authMiddleware, (req, res) => {
  const db = readDB();
  const id = req.params.id;

  const transactionIndex = db.transactions.findIndex((t) => t.id === id);
  if (transactionIndex === -1)
    return res.status(404).json({ error: "Transação não encontrada." });
  const transaction = db.transactions[transactionIndex];

  const accountIndex = db.accounts.findIndex(
    (acc) => acc.id === transaction.account_id
  );
  if (accountIndex === -1)
    return res.status(404).json({ error: "Conta não encontrada." });
  const account = db.accounts[accountIndex];

  const revertResult = updateAccountBalance(
    account,
    transaction.amount,
    transaction.category,
    true
  );
  if (revertResult.error)
    return res.status(400).json({ error: revertResult.error });

  db.accounts[accountIndex].balance = revertResult.account.balance;
  db.transactions.splice(transactionIndex, 1);

  writeDB(db);
  res.status(204).send();
});

module.exports = router;
