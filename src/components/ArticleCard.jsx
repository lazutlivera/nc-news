import { Link } from 'react-router-dom';

export default function ArticleCard({ article, isFirstArticle }) {

    return (
        <Link to={`/article/${article.article_id}`} className={isFirstArticle ? "featured-article-card" : "article-card"}>
            <img src={article.article_img_url} alt={article.title} />
            <h3 id="article-title">{article.title}</h3>
            <p id="article-author">{isFirstArticle ? article.author : `Votes: ${article.votes}`}</p>
            <p id="article-votes">{isFirstArticle ? article.votes : null} </p>
        </Link>
    );
}