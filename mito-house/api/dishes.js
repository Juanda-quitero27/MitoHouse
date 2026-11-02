const { redis, verify } = require("./_lib");
const { CATS, BASE } = require("./_seed");
const CAT_IDS = CATS.map((c) => c.id);
let seeded = false;

async function seed() {
  if (seeded) return;
  const done = new Set((await redis(["SMEMBERS", "mito:seeded"])) || []);
  const fresh = BASE.filter((x) => !done.has(x.id));
  if (fresh.length) {
    const cmd = ["HSET", "mito:dishes"];
    fresh.forEach((x) => cmd.push(x.id, JSON.stringify(x)));
    await redis(cmd);
    await redis(["SADD", "mito:seeded", ...fresh.map((x) => x.id)]);
  }
  seeded = true;
}
function clean(b) {
  const n = String(b.n || "").trim().slice(0, 50), d = String(b.d || "").trim().slice(0, 300), p = Number(b.p);
  if (!n || !(p > 0) || !CAT_IDS.includes(b.c)) return null;
  return { c: b.c, n, d, p, e: String(b.e || "🍽️").slice(0, 8) };
}
const okImg = (s) => { s = String(s || ""); return s.startsWith("data:image/jpeg;base64,") && s.length <= 150000 ? s : ""; };

module.exports = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store");
    if (req.method === "GET") {
      await seed();
      const a = (await redis(["HGETALL", "mito:dishes"])) || [];
      const out = [];
      for (let i = 1; i < a.length; i += 2) out.push(JSON.parse(a[i]));
      return res.json({ cats: CATS, dishes: out.sort((x, y) => x.t - y.t) });
    }
    if (!verify(req.headers.authorization)) return res.status(401).json({ error: "No autorizado" });
    const b = req.body || {};
    if (req.method === "POST") {
      const c = clean(b);
      if (!c) return res.status(400).json({ error: "Datos inválidos" });
      const t = Date.now(), id = "c" + t;
      const item = { id, ...c, img: okImg(b.img), t };
      await redis(["HSET", "mito:dishes", id, JSON.stringify(item)]);
      return res.status(201).json(item);
    }
    const id = String(req.query.id || "");
    if (!/^[bc]\d+$/.test(id)) return res.status(400).json({ error: "id inválido" });
    if (req.method === "PUT") {
      const cur = await redis(["HGET", "mito:dishes", id]);
      if (!cur) return res.status(404).json({ error: "No existe" });
      const o = JSON.parse(cur);
      const c = clean({ ...o, ...b });
      if (!c) return res.status(400).json({ error: "Datos inválidos" });
      const img = b.rmImg ? "" : b.img ? okImg(b.img) : o.img;
      const item = { ...o, ...c, img };
      await redis(["HSET", "mito:dishes", id, JSON.stringify(item)]);
      return res.json(item);
    }
    if (req.method === "DELETE") {
      await redis(["HDEL", "mito:dishes", id]);
      return res.json({ ok: true });
    }
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: "Error del servidor" });
  }
};