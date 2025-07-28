const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { readDB } = require("../utils/db");

router.get("/user/:id", authMiddleware, (req, res) => {
	const db = readDB();

	const userId = req.params.id;
	const account = db.accounts.find(acc => acc.user_id === userId);

	if (!account) {
		return res.status(404).json({ error: "Conta não encontrada para esse usuário." });
	}

	return res.json(account);
});

module.exports = router;
