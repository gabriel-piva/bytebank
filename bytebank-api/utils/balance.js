const { readDB } = require("./db");

function updateAccountBalance(account, amount, category, reverse = false) {
	const db = readDB();

	const accountIndex = db.accounts.findIndex(acc => acc.id === account.id);

	let currentBalance = parseFloat(account.balance);
	const numericAmount = parseFloat(amount);

	let newBalance;
	if (reverse) {
		newBalance =
			category === "entrada"
				? currentBalance - numericAmount
				: currentBalance + numericAmount;
	} else {
		if (category === "saida" && currentBalance < numericAmount) {
			return { error: "Saldo insuficiente." };
		}
		newBalance =
			category === "entrada"
				? currentBalance + numericAmount
				: currentBalance - numericAmount;
	}

	return { account: { ...account, balance: newBalance.toFixed(2) } };
}

module.exports = { updateAccountBalance };
