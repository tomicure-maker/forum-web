import Post from "../models/Post.js";
import { User } from "../models/User.js";
import { Etiqueta } from "../models/Etiqueta.js";

const include = [
  { model: User, as: "autor", attributes: ["id", "nombreUsuario", "esAdmin"] },
  { model: Etiqueta, as: "etiquetas", through: { attributes: [] } },
];

export async function listPosts() {
  return Post.findAll({ include, order: [["id", "DESC"]] });
}

export async function getPost(id) {
  return Post.findByPk(id, { include });
}

export async function createPost({ titulo, contenido, tags = [] }, userId) {
  if (!titulo?.trim() || !contenido?.trim()) {
    const error = new Error("El título y el contenido son obligatorios.");
    error.status = 400;
    throw error;
  }
  const post = await Post.create({ titulo: titulo.trim(), contenido: contenido.trim(), usuarioId: userId });
  if (Array.isArray(tags) && tags.length) {
    const cleanTags = [...new Set(tags.map((tag) => typeof tag === "string" ? tag : tag?.tagName).filter((tag) => typeof tag === "string" && tag.trim()).map((tag) => tag.trim()))];
    const tagRows = await Promise.all(cleanTags.map((nombre) => Etiqueta.findOrCreate({ where: { nombre } })));
    await post.setEtiquetas(tagRows.map(([tag]) => tag));
  }
  return getPost(post.id);
}

export async function deletePost(id, user) {
  const post = await Post.findByPk(id);
  if (!post) {
    const error = new Error("No se encontró la publicación.");
    error.status = 404;
    throw error;
  }
  if (post.usuarioId !== user.id && !user.esAdmin) {
    const error = new Error("Solo el autor o un administrador pueden eliminar esta publicación.");
    error.status = 403;
    throw error;
  }
  await post.destroy();
}
