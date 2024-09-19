import { createContext, useState, useEffect } from "react";
import { getArticles } from "../components/apiCalls";

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        getArticles(query).then(({articles}) => {
            setArticles(articles);
        });
    }, [query]);

    return (
        <ArticleContext.Provider value={{ articles, setArticles, query, setQuery }}>
            {children}
        </ArticleContext.Provider>
    );
};