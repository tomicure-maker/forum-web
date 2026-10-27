import { Etiqueta } from "../models/Etiqueta.js";

const defaultTags = [
  { nombre: "JavaScript", color: "warning" },
  { nombre: "React", color: "primary" },
  { nombre: "CSS", color: "info" },
  { nombre: "Pregunta", color: "success" },
];

export async function listTags() {
  return Etiqueta.findAll({ order: [["nombre", "ASC"]] });
}

export async function seedDefaultTags() {
  for (const { nombre, color } of defaultTags) {
    await Etiqueta.findOrCreate({ where: { nombre }, defaults: { color } });
  }
}
