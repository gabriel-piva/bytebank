const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

function readDB() {
	const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
	return db;
}
function writeDB(data) {
	fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };
