const db = require('../db/connection')
const {createRef} = require('../db/seeds/utils')

exports.fetchReviews = (sort_by = 'created_at', order = 'DESC', category) => {
    const validSorts = ['review_id', 'title', 'category', 'designer', 'owner', 'review_body', 'review_img_url', 'created_at', 'votes']
    const queries = []
    
    if (validSorts.indexOf(`${sort_by}`) === -1) return Promise.reject({statusCode: 400, msg: "Invalid sort_by; please refer to documentation."})
    
    
    let query = `
    SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    `
    if (category) {
        query += ' WHERE category = $1'
        queries.push(category)
    }

    query += `
    GROUP BY reviews.review_id
    ORDER BY reviews.${sort_by} `
    order = order.toUpperCase()
    switch (order) {
        case 'ASC': 
            query += 'ASC'
            break
        case 'DESC':
            query += 'DESC'
            break
        default:
            return Promise.reject({statusCode: 400, msg: "Results must be ordered by ASC or DESC"})
    }
    return db.query(query, queries)
    .then(({rows}) => rows)
}

exports.fetchReview = (review_id) => {
    return db.query(`
    SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id
    `, [review_id])
    .then(({rows}) => {
        if (rows[0]) return rows[0]
        else return Promise.reject({statusCode: 404, msg: 'Sorry, there is no review with that ID.'})
    })
}

exports.updateReview = (review_id, votes = 0) => {
    return db.query(`
    SELECT votes FROM reviews
    WHERE review_id = $1
    `, [review_id])
    .then(({rows}) => {
        if (!rows[0]) return Promise.reject({statusCode: 404, msg: 'Sorry, there is no review with that ID.'})
        
        const currentVotes = rows[0].votes + votes

        return db.query(`
        UPDATE reviews
        SET votes = $1
        WHERE review_id = $2
        RETURNING *`, [currentVotes, review_id])
    })
    .then(({rows}) => rows[0])
}