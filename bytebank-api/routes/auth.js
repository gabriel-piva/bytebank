const express = require("express");
const router = express.Router();
const { readDB } = require("../utils/db");

function generateToken(userId) {
	return Buffer.from(`${userId}-${Date.now()}`).toString("base64");
}

router.post("/", (req, res) => {
	const db = readDB();

	const { email, password } = req.body;
	const user = db.users.find(u => u.email === email && u.password === password);

	if (!user) {
		return res.status(401).json({ message: "Credenciais inválidas" });
	}

	const token = generateToken(user.id);

	return res.json({
		token,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			avatar_url: user.avatar_url,
			created_at: user.created_at,
			updated_at: user.updated_at
		}
	});
});

module.exports = router;
