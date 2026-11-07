import { apiRequest } from "./api.js";

function mapComment(comment) {
  return {
    id: comment.id,
    author: comment.autor?.nombreUsuario || "Usuario",
    authorId: comment.autor?.id,
    authorRole: comment.autor?.rol,
    text: comment.contenido,
    replies: (comment.respuestas || []).map(mapComment),
    date: comment.fecha_creacion,
  };
}

export async function getComments(postId) {
  const comments = await apiRequest(`/posts/${postId}/comments`);
  return comments.map(mapComment);
}

export async function addComment(postId, text, parentId = null) {
  await apiRequest(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ contenido: text, comentarioPadreId: parentId }),
  });
  return getComments(postId);
}

export async function deleteComment(commentId) {
  await apiRequest(`/comments/${commentId}`, {
    method: "DELETE",
  });
}