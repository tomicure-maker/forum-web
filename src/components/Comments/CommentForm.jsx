import React, { useState } from 'react';

export default function CommentForm({ onSubmit, placeholder = "Escribe un comentario..." }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
      <input
        type="text"
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        style={{ fontSize: '0.9rem' }}
      />
      <button type="submit" className="btn btn-primary btn-sm">
        Enviar
      </button>
    </form>
  );
}