import { useState } from "react";
import CommentForm from "./CommentForm.jsx";

export default function Comment({ comment, onAddReply, onEdit, onDelete, canComment, canDelete, canEdit }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [editError, setEditError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleReply(text) {
    await onAddReply(comment.id, text);
    setShowReplyForm(false);
  }

  async function handleEdit(event) {
    event.preventDefault();
    setSaving(true);
    setEditError("");

    try {
      await onEdit(comment.id, editText.trim());
      setEditing(false);
    } catch (error) {
      setEditError(error.message || "No se pudo editar el comentario.");
    } finally {
      setSaving(false);
    }
  }

  return <div className="mt-3 ps-3 border-start">
    <div className="bg-body-secondary p-2 rounded">
      <p className="mb-1 fw-semibold">{comment.author}</p>
      {comment.editedBy && <p className="mb-1 text-muted small">Editado por {comment.editedBy}</p>}
      {editing ? (
        <form onSubmit={handleEdit}>
          <textarea
            className="form-control mb-2"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary btn-sm me-2" disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(false)} disabled={saving}>
            Cancelar
          </button>
          {editError && <p className="text-danger small mt-2 mb-0">{editError}</p>}
        </form>
      ) : <p className="mb-1">{comment.text}</p>}
      {canComment && <button type="button" className="btn btn-link btn-sm p-0"
        onClick={() => setShowReplyForm((value) => !value)}>
        {showReplyForm ? "Cancelar" : "Responder"}
      </button>}
      {canEdit(comment) && !editing && (
        <button
          type="button"
          className="btn btn-link btn-sm p-0 ms-3"
          onClick={() => {
            setEditText(comment.text);
            setEditError("");
            setEditing(true);
          }}
        >
          Editar
        </button>
      )}
      {canDelete(comment) && (
        <button
          type="button"
          className="btn btn-link btn-sm text-danger p-0 ms-3"
          onClick={() => onDelete(comment.id)}
        >
          Eliminar
        </button>
        )}
      
    </div>
    {showReplyForm && <div className="mt-2"><CommentForm onSubmit={handleReply} placeholder="Escribe tu respuesta..." /></div>}
    {(comment.replies || []).map((reply) =>
      <Comment
        key={reply.id}
        comment={reply}
        onAddReply={onAddReply}
        onEdit={onEdit}
        onDelete={onDelete}
        canComment={canComment}
        canDelete={canDelete}
        canEdit={canEdit}
      />
    )}
  </div>;
}
