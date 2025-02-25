import React from "react";
import { useState } from "react";
import './comments.css';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const handleAddComment = () => {
    if (input.trim()) {
      setComments([...comments, input]);
      setInput("");
    }
  };

  return (
    <div className="comment-section">
      <h2 className="comment-title">Comments</h2>
      <div className="comment-input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a comment..."
          className="comment-input"
        />
        <button onClick={handleAddComment} className="comment-button">
          Post
        </button>
      </div>
      <div className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-item">
              {comment}
            </div>
          ))
        ) : (
          <p className="comment-placeholder">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default Comments;

// export default function CommentSection() {

//   return (

//   );
// }
