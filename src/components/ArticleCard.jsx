import { Link } from 'react-router-dom';

export default function ArticleCard({ article, isFirstArticle }) {

    return (
        <Link to={`/article/${article.article_id}`} className={isFirstArticle ? "featured-article" : "article-card"}>
            <img src={article.article_img_url} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{isFirstArticle ? article.author : `Votes: ${article.votes}`}</p>
            <p>{isFirstArticle ? article.votes : null}</p>
        </Link>
    );
}