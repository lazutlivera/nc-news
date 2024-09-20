import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticleContext } from "../contexts/ArticleContext";
import ArticleCard from "./ArticleCard";

export default function Articles() {
    const { articles, setQuery } = useContext(ArticleContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setIsLoading(true);
        const sortBy = searchParams.get("sort_by") || "created_at";
        const order = searchParams.get("order") || "desc";

        setQuery({ sort_by: sortBy, order: order });
        setIsLoading(false);
    }, [searchParams, setQuery]);

    const handleSortChange = (e) => {
        const [sortBy, order] = e.target.value.split(',');
        setSearchParams({ sort_by: sortBy, order: order });
    };

    if (isLoading) return <p>Loading articles...</p>;
    if (error) return <p>Error loading articles: {error}</p>;

    return (
        <>
            <section className="sort-articles">
                <h2>Sort Articles</h2>
                <select onChange={handleSortChange}>
                    <option value="created_at,desc">Newest</option>
                    <option value="created_at,asc">Oldest</option>
                    <option value="votes,desc">Most Votes</option>
                    <option value="votes,asc">Least Votes</option>
                </select>
            </section>
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
        </>
    );
}