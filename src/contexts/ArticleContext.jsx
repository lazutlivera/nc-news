import { createContext, useState, useEffect } from "react";
import { getArticles } from "../components/apiCalls";

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles().then(({articles}) => {
            setArticles(articles);
        });
    }, []);

    return (
        <ArticleContext.Provider value={{ articles, setArticles }}>
            {children}
        </ArticleContext.Provider>
    );
};