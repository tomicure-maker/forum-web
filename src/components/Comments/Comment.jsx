import React, { useState } from 'react';
import CommentForm from './CommentForm';

export default function Comment({ comment, onAddReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = (replyText) => {
    onAddReply(comment.id, replyText);
    setShowReplyForm(false);
  };

  return (
    <div style={{ 
      marginTop: '12px', 
      paddingLeft: '12px', 
      borderLeft: '2px solid #e5e7eb',
      fontSize: '0.95rem'
    }}>
      <div style={{ background: '#f9fafb', padding: '8px 12px', borderRadius: '6px' }}>
        <p style={{ margin: 0, fontWeight: '600', color: '#1f2937', fontSize: '0.85rem' }}>
          {comment.author}
        </p>
        <p style={{ margin: '4px 0 0 0', color: '#4b5563' }}>
          {comment.text}
        </p>
        
        <button 
          onClick={() => setShowReplyForm(!showReplyForm)} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#2563eb', 
            cursor: 'pointer', 
            padding: 0, 
            marginTop: '6px',
            fontSize: '0.8rem',
            fontWeight: '500'
          }}
        >
          {showReplyForm ? 'Cancelar' : 'Responder'}
        </button>
      </div>

      {showReplyForm && (
        <div style={{ marginTop: '8px' }}>
          <CommentForm onSubmit={handleReplySubmit} placeholder="Escribe tu respuesta..." />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div style={{ marginTop: '8px' }}>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onAddReply={onAddReply} />
          ))}
        </div>
      )}
    </div>
  );
}