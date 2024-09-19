import { useEffect, useContext, useState } from "react"
import { ArticleContext } from "../contexts/ArticleContext"
import ArticleCard from "./ArticleCard"

export default function Articles() {
    const { articles, setArticles } = useContext(ArticleContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (articles.length === 0) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [articles]);

    if (isLoading) return <p>Loading articles...</p>;
    if (error) return <p>Error loading articles: {error}</p>;

    return (
        <div className="articles-container">
            {articles.length > 0 ? (
                <>
                    <section className="featured-article">
                        <ArticleCard article={articles[0]} isFirstArticle={true} />
                    </section>
                    <section className="other-articles">
                        {articles.slice(1).map((article) => (
                            <ArticleCard 
                                key={article.article_id} 
                                article={article}
                                isFirstArticle={false}
                            />
                        ))}
                    </section>
                </>
            ) : (
                <div>No articles found</div>
            )}
        </div>
    );
}