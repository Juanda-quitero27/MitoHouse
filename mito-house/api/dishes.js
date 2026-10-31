const { redis, verify } = require("./_lib");
const CATS = ["pastas", "brochetas", "ensaladas", "hamburguesas", "kids"];
module.exports = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store");
    if (req.method === "GET") {
      const a = (await redis(["HGETALL", "mito:dishes"])) || [];
      const out = [];
      for (let i = 1; i < a.length; i += 2) out.push(JSON.parse(a[i]));
      return res.json(out.sort((x, y) => x.t - y.t));
    }
    if (!verify(req.headers.authorization)) return res.status(401).json({ error: "No autorizado" });
    if (req.method === "POST") {
      const b = req.body || {};
      const n = String(b.n || "").trim().slice(0, 50), d = String(b.d || "").trim().slice(0, 200), p = Number(b.p);
      if (!n || !d || !(p > 0) || !CATS.includes(b.c)) return res.status(400).json({ error: "Datos inválidos" });
      let img = String(b.img || "");
      if (img && (!img.startsWith("data:image/jpeg;base64,") || img.length > 150000)) img = "";
      const id = "c" + Date.now();
      const item = { id, c: b.c, n, d, p, e: String(b.e || "🍽️").slice(0, 8), img, t: Date.now() };
      await redis(["HSET", "mito:dishes", id, JSON.stringify(item)]);
      return res.status(201).json(item);
    }
    if (req.method === "DELETE") {
      const id = String(req.query.id || "");
      if (!/^c\d+$/.test(id)) return res.status(400).json({ error: "id inválido" });
      await redis(["HDEL", "mito:dishes", id]);
      return res.json({ ok: true });
    }
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: "Error del servidor" });
  }
};
