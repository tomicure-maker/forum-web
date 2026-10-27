import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { Op } from "sequelize";
import { User } from "../models/User.js";

const scrypt = promisify(scryptCallback);

export async function registerUser({ nombreUsuario, email, password }) {
  if (!nombreUsuario?.trim() || !email?.trim() || !password) {
    const error = new Error("Usuario, email y contraseña son obligatorios.");
    error.status = 400;
    throw error;
  }
  if (password.length < 8) {
    const error = new Error("La contraseña debe tener al menos 8 caracteres.");
    error.status = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existing = await User.findOne({
    where: { [Op.or]: [{ nombreUsuario: nombreUsuario.trim() }, { email: normalizedEmail }] },
  });
  if (existing) {
    const error = new Error("Ese nombre de usuario o email ya está registrado.");
    error.status = 409;
    throw error;
  }

  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, 64);
  const passwordHash = `${salt}:${Buffer.from(derived).toString("hex")}`;
  return User.create({ nombreUsuario: nombreUsuario.trim(), email: normalizedEmail, password: passwordHash, esAdmin: false });
}

export async function verifyCredentials({ identificador, password }) {
  if (!identificador?.trim() || !password) {
    const error = new Error("Ingresá tu usuario/email y contraseña.");
    error.status = 400;
    throw error;
  }
  const value = identificador.trim();
  const user = await User.findOne({ where: { [Op.or]: [{ nombreUsuario: value }, { email: value.toLowerCase() }] } });
  if (!user || !user.password.includes(":")) {
    const error = new Error("Credenciales incorrectas.");
    error.status = 401;
    throw error;
  }
  const [salt, savedHash] = user.password.split(":");
  const candidate = Buffer.from(await scrypt(password, salt, 64)).toString("hex");
  const savedBuffer = Buffer.from(savedHash, "hex");
  const candidateBuffer = Buffer.from(candidate, "hex");
  if (savedBuffer.length !== candidateBuffer.length || !timingSafeEqual(savedBuffer, candidateBuffer)) {
    const error = new Error("Credenciales incorrectas.");
    error.status = 401;
    throw error;
  }
  return user;
}

export function publicUser(user) {
  return { id: user.id, nombreUsuario: user.nombreUsuario, email: user.email, esAdmin: user.esAdmin };
}
