import axios from 'axios'

const ncNews = axios.create({
    baseURL: 'https://nc-news-dgn.onrender.com/api'
})



export const getArticles = () => {
    return ncNews.get('/articles')
        .then(({data}) => {
            return data
        })
}

export const getArticleById = (article_id) => {
    return ncNews.get(`/articles/${article_id}`)
        .then(({data}) => {
            return data
        })
}

export const getCommentsByArticleId = (article_id) => {
    return ncNews.get(`/articles/${article_id}/comments`)
        .then(({data}) => {
            return data
        })
}
