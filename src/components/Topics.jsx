import { useParams } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import ArticleCard from './ArticleCard';
import { ArticleContext } from '../contexts/ArticleContext';

export default function Topics({ topics }) {
  const { topic } = useParams();
  const { articles } = useContext(ArticleContext);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (articles.length > 0) {
      const filtered = articles.filter(article => article.topic === topic);
      setFilteredArticles(filtered);
      setIsLoading(false);
    }
  }, [articles, topic]);


  if (isLoading) return <p>Loading articles...</p>;

  const currentTopic = topics.find(t => t.slug === topic);

  return (
    <div>
      <h2>{currentTopic ? currentTopic.slug : 'Topic not found'}</h2>
      <p>{currentTopic ? currentTopic.description : ''}</p>
      <div className="articles-container">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
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
