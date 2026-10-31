const { sign } = require("./_lib");
module.exports = (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const { u, p } = req.body || {};
  if (process.env.ADMIN_PASS && u === process.env.ADMIN_USER && p === process.env.ADMIN_PASS) return res.json({ token: sign() });
  res.status(401).json({ error: "Credenciales incorrectas" });
};
