import './App.css'
import Header from './components/Header'
import Articles from './components/Articles'
import ArticlePage from './components/ArticlePage'
import Topics from './components/Topics'
import { Routes, Route } from 'react-router-dom'
import { ArticleProvider } from './contexts/ArticleContext'
import { useEffect, useState } from 'react'
import { getTopics } from './components/apiCalls'





function App() {

const [topics, setTopics] = useState([]);
useEffect(() => {
  getTopics().then(({topics}) => {
    setTopics(topics);
  });
}, []);

  return (
    <ArticleProvider>
      <Header topics={topics} />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/article/:article_id" element={<ArticlePage />} />
        <Route path="/topics/:topic" element={<Topics topics={topics}/>} />
      </Routes>
    </ArticleProvider>
  )
}

export default App
