const crypto = require("crypto");
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOK = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(cmd) {
  const r = await fetch(URL_, { method: "POST", headers: { Authorization: "Bearer " + TOK }, body: JSON.stringify(cmd) });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}
const hmac = (p) => crypto.createHmac("sha256", process.env.AUTH_SECRET || "").update(p).digest("hex");
function sign() { const p = String(Date.now() + 12 * 3600e3); return p + "." + hmac(p); }
function verify(h) {
  if (!process.env.AUTH_SECRET) return false;
  const [p, s] = (h || "").replace(/^Bearer /, "").split(".");
  if (!p || !s) return false;
  const a = Buffer.from(s), b = Buffer.from(hmac(p));
  return a.length === b.length && crypto.timingSafeEqual(a, b) && Date.now() < Number(p);
}
module.exports = { redis, sign, verify };
