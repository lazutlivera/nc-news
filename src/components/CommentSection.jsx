import { useState, useEffect, useContext } from "react";
import { getCommentsByArticleId, postComment, deleteComment } from "./apiCalls";
import { UserContext } from "../contexts/UserContext";

export default function CommentSection({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [isPosting, setIsPosting] = useState(false);

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
  }, [comments]);

  const addComment = (comment) => {
    setIsPosting(true);
    const optimisticComment = {
      comment_id: `${Date.now()}`,
      author: user.username,
      votes: 0,
      body: comment.body,
    };
    setComments((prevComments) => {
      const newComments = [optimisticComment, ...prevComments];
      return newComments;
    } 
  );

    postComment(article_id, comment)
      .then((data) => {
        setComments((prevComments) => 
          prevComments.map((c) => 
            c.comment_id === optimisticComment.comment_id ? { ...data, author: data.username } : c
          )
        );
        setMessage("Comment posted successfully");
        setIsPosting(false);
      })
      .catch((err) => {
        console.error("Error posting comment:", err);
        setError("Failed to post comment");
        setComments((prevComments) =>
          prevComments.filter((c) => c.comment_id !== optimisticComment.comment_id)
          
        
        );
      })

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() ){
      setMessage("You must enter a comment");
      return;
    }
    if (!user.username) return;
    const newComment = { 
      username: user.username,
      body: comment 
    };
    addComment(newComment);
    setComment("");
    setMessage("");
  };


  const handleChange = (e) => {
    setComment(e.target.value);

  };

  const removeComment = (comment_id) => {
    deleteComment(comment_id)
      .then(() => {
        setComments(comments.filter((comment) => comment.comment_id !== comment_id));
        setMessage("Comment deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting comment:", err);
        setError("Failed to delete comment");
        setComments(comments.filter((comment) => comment.comment_id !== comment_id));
      });
  };
  const handleDeleteClick = (comment) => {
    if (user.username === comment.author) {
      removeComment(comment.comment_id);
    } else {
      alert("You can only delete your own comments");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (isPosting) return <div>Posting...</div>;
  return (
    <section className="comment-section">
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          placeholder="Write your comment here"
          value={comment}
          onChange={handleChange}
        />
        <button type="submit" disabled={!comment || !user.username}>
          Post Comment
        </button>
      </form>
      {message && <p>{message}</p>}
      {error && <p className="error">{error}</p>}
      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.comment_id} className="comment">
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Posted by: {comment.author}</p>
            {user.username === comment.author && 
              <button onClick={() => handleDeleteClick(comment)}>Delete</button>
            }
          </div>
        ))
      ) : (
        <div>No comments yet</div>
      )}
      {isPosting && <div>Posting...</div>}
    </section>
  );
}
