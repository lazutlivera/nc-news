import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticleById } from './apiCalls';
import { Link } from 'react-router-dom';
import CommentSection from './CommentSection';
import { patchVotes } from './apiCalls';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';



export default function ArticlePage() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [vote, setVote] = useState(0);
    const {user} = useContext(UserContext);
    

    useEffect(() => {
       
        
        setIsLoading(true);
        getArticleById(article_id)
            .then((data) => {
                setArticle(data.article);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error getting article:", err);
                setError("Article does not exist, yet!");
                setIsLoading(false);
            });
    }, []);


    const handleVote = (num) => {
        setVote(currentVote => {
            const newVote = currentVote + num;
            patchVotes(article_id, num)
                .catch(err => {
                    console.error("Error updating votes:", err);
                    setError("Failed to update votes");
                    setVote(currentVote); 
                });
            return newVote;
        });
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <article className="article-page">
            <header>
                <h1 className="article-title">{article.title}</h1>
            <div className="article-info">
                <Link to={`/users/${article.author}`}>By {article.author}</Link> | {new Date(article.created_at).toLocaleDateString()}
            </div>
            </header>
            <main>
            {article.article_img_url && (
                <img className="article-image" src={article.article_img_url} alt={article.title} />
            )}
            <p className="article-body">{article.body}</p>
            <p className="article-votes">Votes: {article.votes + vote}</p>
            <section className="vote-buttons">
                <button onClick={() => handleVote(1)} disabled={vote === 1 || user.username===article.author}>Vote Up</button>
                <button onClick={() => handleVote(-1)} disabled={vote === -1 || user.username===article.author}>Vote Down</button>
            </section>
            </main>
        </article>
        <CommentSection article_id={article_id} />
        </>
    );
}