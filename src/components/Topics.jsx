import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticles } from './apiCalls';
import ArticleCard from './ArticleCard';

export default function Topics({ topics }) {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then(({ articles }) => {
        const filteredArticles = articles.filter(article => article.topic === topic);
        setArticles(filteredArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles");
        setIsLoading(false);
      });
  }, [topic]);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  const currentTopic = topics.find(t => t.slug === topic);

  return (
    <div>
      <h2>{currentTopic ? currentTopic.slug : 'Topic not found'}</h2>
      <p>{currentTopic ? currentTopic.description : ''}</p>
      <div className="articles-container">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard 
              key={article.article_id} 
              article={article}
              isFirstArticle={false}
            />
          ))
        ) : (
          <div>No articles found for this topic</div>
        )}
      </div>
    </div>
  );
}
