import { useCallback, useEffect, useState } from "react";
import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm.jsx";
import { addComment, getComments } from "../../services/commentService.js";
import { isAuthenticated } from "../../services/authService.js";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [canComment, setCanComment] = useState(isAuthenticated());

  const load = useCallback(async () => {
    setLoading(true);
    try { setComments(await getComments(postId)); setError(""); }
    catch (err) { setError(err.message || "No se pudieron cargar los comentarios."); }
    finally { setLoading(false); }
  }, [postId]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const update = () => setCanComment(isAuthenticated());
    window.addEventListener("forum-auth-changed", update);
    return () => window.removeEventListener("forum-auth-changed", update);
  }, []);

  async function handleAddRoot(text) {
    setComments(await addComment(postId, text));
  }
  async function handleAddReply(parentId, text) {
    setComments(await addComment(postId, text, parentId));
  }

  return <section className="mt-4 border-top pt-3">
    <h4>Comentarios</h4>
    {error && <div className="alert alert-danger">{error}</div>}
    {canComment
      ? <CommentForm onSubmit={handleAddRoot} placeholder="Escribe un comentario..." />
      : <p className="text-muted">Iniciá sesión para comentar o responder.</p>}
    <div className="mt-3">
      {loading ? <p>Cargando comentarios...</p> : comments.length === 0
        ? <p className="text-muted">Aún no hay comentarios. ¡Sé el primero en comentar!</p>
        : comments.map((comment) => <Comment key={comment.id} comment={comment} onAddReply={handleAddReply} canComment={canComment} />)}
    </div>
  </section>;
}
