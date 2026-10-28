import { useState } from "react";
import CommentForm from "./CommentForm.jsx";

export default function Comment({ comment, onAddReply, canComment }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  async function handleReply(text) {
    await onAddReply(comment.id, text);
    setShowReplyForm(false);
  }

  return <div className="mt-3 ps-3 border-start">
    <div className="bg-body-secondary p-2 rounded">
      <p className="mb-1 fw-semibold">{comment.author}</p>
      <p className="mb-1">{comment.text}</p>
      {canComment && <button type="button" className="btn btn-link btn-sm p-0"
        onClick={() => setShowReplyForm((value) => !value)}>
        {showReplyForm ? "Cancelar" : "Responder"}
      </button>}
    </div>
    {showReplyForm && <div className="mt-2"><CommentForm onSubmit={handleReply} placeholder="Escribe tu respuesta..." /></div>}
    {(comment.replies || []).map((reply) =>
      <Comment key={reply.id} comment={reply} onAddReply={onAddReply} canComment={canComment} />
    )}
  </div>;
}
