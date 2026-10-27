import { useState } from "react";

export default function CommentForm({ onSubmit, placeholder = "Escribe un comentario..." }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    setError("");
    try {
      await onSubmit(text.trim());
      setText("");
    } catch (err) {
      setError(err.message || "No se pudo enviar el comentario.");
    } finally {
      setSending(false);
    }
  }

  return <form onSubmit={handleSubmit} className="d-flex gap-2">
    <input type="text" className="form-control" value={text}
      onChange={(e) => setText(e.target.value)} placeholder={placeholder} required />
    <button type="submit" className="btn btn-primary btn-sm" disabled={sending}>
      {sending ? "Enviando..." : "Enviar"}
    </button>
    {error && <small className="text-danger">{error}</small>}
  </form>;
}
