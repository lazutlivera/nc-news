import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticleById } from './apiCalls';
import { Link } from 'react-router-dom';
export default function ArticlePage() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getArticleById(article_id)
            .then((data) => {
                setArticle(data.article);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error getting article:", err);
                setError("Failed to load article");
                setIsLoading(false);
            });
        }, [article_id]);
        
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

    return (
        <div className="article-page">
            <h1 className="article-title">{article.title}</h1>
            <div className="article-info">
                <Link to={`/users/${article.author}`}>By {article.author}</Link> | {new Date(article.created_at).toLocaleDateString()}
            </div>
            {article.article_img_url && (
                <img className="article-image" src={article.article_img_url} alt={article.title} />
            )}
            <p className="article-body">{article.body}</p>
            <div className="article-votes">Votes: {article.votes}</div>
        </div>
    );
}