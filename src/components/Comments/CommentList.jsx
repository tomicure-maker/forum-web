import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

export default function CommentList() {
 
  const [comments, setComments] = useState([]);

  const addReplyToTree = (commentList, targetId, replyText) => {
    return commentList.map((item) => {
      if (item.id === targetId) {
        return {
          ...item,
          replies: [
            ...(item.replies || []),
            {
              id: Date.now(),
              author: 'Usuario',
              text: replyText,
              replies: []
            }
          ]
        };
      }
      if (item.replies && item.replies.length > 0) {
        return {
          ...item,
          replies: addReplyToTree(item.replies, targetId, replyText)
        };
      }
      return item;
    });
  };

  const handleAddRootComment = (text) => {
    const newComment = {
      id: Date.now(),
      author: 'Usuario',
      text,
      replies: []
    };
    setComments([...comments, newComment]);
  };

  const handleAddReply = (commentId, replyText) => {
    setComments((prevComments) => addReplyToTree(prevComments, commentId, replyText));
  };

  return (
    <div style={{ marginTop: '24px', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
      <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#374151' }}>Comentarios</h4>
      
      <CommentForm onSubmit={handleAddRootComment} placeholder="Escribe un comentario..." />
      
      <div style={{ marginTop: '16px' }}>
        {comments.length === 0 ? (
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', italic: 'true' }}>
            Aún no hay comentarios. ¡Sé el primero en comentar!
          </p>
        ) : (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} onAddReply={handleAddReply} />
          ))
        )}
      </div>
    </div>
  );
}