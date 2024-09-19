import axios from 'axios'

const ncNews = axios.create({
    baseURL: 'https://nc-news-dgn.onrender.com/api'
})



export const getArticles = (query) => {
    return ncNews.get('/articles', { params: query })
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

export const patchVotes = (article_id, vote) => {
    return ncNews.patch(`/articles/${article_id}`, {inc_votes: vote})
        .then(({data}) => {
            return data
        })
}
export const getUsers = () => {
    return ncNews.get(`/users`)
        .then(({data}) => {
            return data
        })
}

export const postComment = (article_id, comment) => {
    return ncNews.post(`/articles/${article_id}/comments`, comment)
        .then(({data}) => {
            return data
        })
}

export const deleteComment = (comment_id) => {
    return ncNews.delete(`/comments/${comment_id}`)
        .then(({data}) => {

            return data
        })
}
export const getTopics = () => {
    return ncNews.get('/topics')
        .then(({data}) => {
            return data
        })
}