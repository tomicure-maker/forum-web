import { useCallback, useEffect, useState } from "react";
import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm.jsx";
import { addComment, getComments, deleteComment, updateComment } from "../../services/commentService.js";
import { isAuthenticated, getCurrentUser, } from "../../services/authService.js";

export default function CommentList({ postId }) {

  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [canComment, setCanComment] = useState(isAuthenticated());
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  const load = useCallback(async () => {
    try { setComments(await getComments(postId)); setError(""); }
    catch (err) { setError(err.message || "No se pudieron cargar los comentarios."); }
    finally { setLoading(false); }
  }, [postId]);

  useEffect(() => {
    let active = true;

    getComments(postId).then((loadedComments) => {
      if (!active) return;
      setComments(loadedComments);
      setError("");
    }).catch((err) => {
      if (active) setError(err.message || "No se pudieron cargar los comentarios.");
    }).finally(() => {
      if (active) setLoading(false);
    });

    return () => { active = false; };
  }, [postId]);
  useEffect(() => {

    const update = () => {

      setCanComment(isAuthenticated());
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener("forum-auth-changed", update);
    return () => window.removeEventListener("forum-auth-changed", update);
  }, []);

  async function handleAddRoot(text) {
    setComments(await addComment(postId, text));
  }

  async function handleAddReply(parentId, text) {
    setComments(await addComment(postId, text, parentId));
  }

  async function handleDelete(commentId) {
  const confirmed = window.confirm(
    "¿Estás seguro de que querés eliminar este comentario?"
  );

  if (!confirmed) return;

  setLoading(true);
  try {
    await deleteComment(commentId);
    await load();
  } catch (err) {
    setError(err.message || "No se pudo eliminar el comentario.");
    setLoading(false);
  }
}

async function handleEdit(commentId, text) {
  setLoading(true);
  try {
    await updateComment(commentId, text);
    await load();
  } catch (err) {
    setLoading(false);
    throw err;
  }
}

function canDeleteComment(comment) {
  if (!currentUser) return false;

  if (comment.authorId === currentUser.id) return true;

  if (currentUser.rol === "admin" && comment.authorRole === "usuario") {
    return true;
  }

  if (
    currentUser.rol === "superadmin" &&
    ["usuario", "admin"].includes(comment.authorRole)
  ) {
    return true;
  }

  return false;
}

function canEditComment(comment) {
  return Boolean(
    currentUser &&
    (comment.authorId === currentUser.id ||
      ["admin", "superadmin"].includes(currentUser.rol))
  );
}

  return (
  <section className="mt-4 border-top pt-3">
    <h4>Comentarios</h4>

    {error && <div className="alert alert-danger">{error}</div>}


    {canComment
      ? <CommentForm onSubmit={handleAddRoot} placeholder="Escribe un comentario..." />
      : <p className="text-muted">Inicia sesion para comentar o responder</p>}

    
    <div className="mt-3">
      {loading ? (
        <p>Cargando comentarios...</p>
      ) : comments.length === 0 ? (
        <p className="text-muted">Aun no hay comentarios. ¡Sé el primero en comentar!</p>
      ) : ( 
        comments.map((comment) => (
        <Comment
        key={comment.id} 
        comment={comment} 
        onAddReply={handleAddReply} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        canComment={canComment} 
        canDelete={canDeleteComment}
        canEdit={canEditComment}
        
        />
        ))
        )}
    </div>
  </section>
  );

}