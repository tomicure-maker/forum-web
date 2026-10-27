import { createHmac, timingSafeEqual } from "node:crypto";
import { User } from "../models/User.js";

const secret = process.env.JWT_SECRET || "solo-desarrollo-cambiar-JWT_SECRET";

function sign(value) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function createToken(user) {
  const payload = Buffer.from(JSON.stringify({ sub: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 })).toString("base64url");
  const data = `v1.${payload}`;
  return `${data}.${sign(data)}`;
}

export async function requireAuth(req, res, next) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
    const [version, payload, signature, extra] = token.split(".");
    if (version !== "v1" || !payload || !signature || extra) return res.status(401).json({ message: "Tenés que iniciar sesión." });
    const data = `${version}.${payload}`;
    const expected = Buffer.from(sign(data));
    const received = Buffer.from(signature);
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return res.status(401).json({ message: "Token inválido." });
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!decoded.sub || decoded.exp < Math.floor(Date.now() / 1000)) return res.status(401).json({ message: "La sesión venció. Iniciá sesión nuevamente." });
    const user = await User.findByPk(decoded.sub);
    if (!user) return res.status(401).json({ message: "Usuario no encontrado." });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "No se pudo validar la sesión." });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user?.esAdmin) return res.status(403).json({ message: "Necesitás permisos de administrador." });
  next();
}
