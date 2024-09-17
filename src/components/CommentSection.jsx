import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "./apiCalls";

export default function CommentSection({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error getting comments:", err);
        setError("Failed to load comments");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="comment-section">
      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.comment_id} className="comment">
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
          </div>
        ))
      ) : (
        <div>No comments yet</div>
      )}
    </div>
  );
}
