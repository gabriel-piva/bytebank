module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token ausente ou malformado" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [userId] = decoded.split("-");
    if (!userId) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.userId = userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Erro ao processar token" });
  }
};
