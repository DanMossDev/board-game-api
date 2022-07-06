const db = require('../db/connection')
const {createRef} = require('../db/seeds/utils')

exports.fetchReviews = async (sort_by = 'created_at', order = 'DESC', category, limit = 10, p = 1) => {
    const validSorts = ['review_id', 'title', 'category', 'designer', 'owner', 'review_body', 'review_img_url', 'created_at', 'votes']
    const queries = [limit, limit * (p - 1)]
    
    if (validSorts.indexOf(`${sort_by}`) === -1) return Promise.reject({statusCode: 400, msg: "Invalid sort_by; please refer to documentation."})
    
    const returnArr = await db.query(`SELECT COUNT(*)::INT AS total_count FROM reviews`)
    const {total_count} = returnArr.rows[0]
    if (limit * (p) > total_count && p !== 1) return Promise.reject({statusCode: 404, msg: `There are not enough results to have a page ${p}`})
    
    let query = `
    SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count, COUNT(*) OVER()::INT AS total_count FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    `
    if (category) {
        query += ' WHERE category = $3'
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
    query += ' LIMIT $1 OFFSET $2'
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

exports.updateReview = (review_id, votes) => {
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

exports.addReview = ({title, category, designer, owner, review_body}) => {
    return db.query(`
    INSERT INTO reviews
    (title, category, designer, owner, review_body)
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *
    `, [title, category, designer, owner, review_body])
    .then(({rows}) => {
        const {review_id} = rows[0]

        return db.query(`
        SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count FROM reviews
        LEFT JOIN comments ON reviews.review_id = comments.review_id
        WHERE reviews.review_id = $1
        GROUP BY reviews.review_id
        `, [review_id])
    })
    .then(({rows}) => rows[0])
}

exports.removeReview = (review_id) => {
    return db.query(`
    DELETE FROM reviews
    WHERE review_id = $1
    RETURNING *`, [review_id]).then(({rowCount}) => {
        if (rowCount === 0) return Promise.reject({statusCode: 404, msg: "Sorry, there is no review with that ID."})
        else return
    })
}

exports.fetchComments = async (review_id, limit = 10, p = 1) => {
    const reviewsArr = await db.query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
    const commentsArr = await db.query(`SELECT COUNT(*)::INT AS total_count FROM comments`)
    const {total_count} = commentsArr.rows[0]
    if (!reviewsArr.rows[0]) return Promise.reject({statusCode: 404, msg: 'Sorry, there is no review with that ID.'})
    if (limit * (p) > total_count && p !== 1) return Promise.reject({statusCode: 404, msg: `There are not enough results to have a page ${p}`})
    
    return db.query(`
        SELECT * FROM comments
        WHERE review_id = $1
        LIMIT $2 OFFSET $3
        `, [review_id, limit, limit * (p - 1)])
    .then(({rows}) => rows)
}

exports.addComment = (review_id, author, body) => {
    return db.query(`
    INSERT INTO comments
    (author, body, review_id)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `, [author, body, parseInt(review_id)])
    .then(({rows}) => rows[0])
}