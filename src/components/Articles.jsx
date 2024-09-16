import { useEffect, useState } from "react"
import { getArticles } from "./apiCalls"
import ArticleCard from "./ArticleCard"

export default function Articles() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        getArticles()
            .then((data) => {
                setArticles(data.articles)
                setIsLoading(false)
            })
            .catch((err) => {
                console.error("Error details:", err)
                setError('Failed to get articles: ' + err.message)
            })

    }, [])

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