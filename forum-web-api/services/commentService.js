import { Comentario } from "../models/Comentario.js";
import { User } from "../models/User.js";
import Post from "../models/Post.js";

const commentInclude = [
  { model: User, as: "autor", attributes: ["id", "nombreUsuario"] },
  { model: Comentario, as: "respuestas", include: [
    { model: User, as: "autor", attributes: ["id", "nombreUsuario"] },
    { model: Comentario, as: "respuestas", include: [
      { model: User, as: "autor", attributes: ["id", "nombreUsuario"] }
    ] }
  ] }
];

export async function listComments(postId) {
  const rows = await Comentario.findAll({
    where: { postId, comentarioPadreId: null },
    include: commentInclude,
    order: [["id", "ASC"]],
  });
  return rows;
}

export async function createComment({ postId, contenido, comentarioPadreId }, userId) {
  if (!contenido?.trim()) {
    const error = new Error("El comentario no puede estar vacío.");
    error.status = 400;
    throw error;
  }
  const post = await Post.findByPk(postId);
  if (!post) {
    const error = new Error("No se encontró la publicación.");
    error.status = 404;
    throw error;
  }
  if (comentarioPadreId != null) {
    const parent = await Comentario.findByPk(comentarioPadreId);
    if (!parent || parent.postId !== postId) {
      const error = new Error("No se encontró el comentario al que querés responder.");
      error.status = 404;
      throw error;
    }
  }
  const created = await Comentario.create({
    contenido: contenido.trim(), postId, usuarioId: userId,
    comentarioPadreId: comentarioPadreId ?? null
  });
  return Comentario.findByPk(created.id, {
    include: [{ model: User, as: "autor", attributes: ["id", "nombreUsuario"] }]
  });
}
