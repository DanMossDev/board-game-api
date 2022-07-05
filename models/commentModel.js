const db = require('../db/connection')
const {createRef} = require('../db/seeds/utils')

exports.fetchComments = (review_id) => {
    return db.query(`
    SELECT * FROM reviews
    WHERE review_id = $1
    `, [review_id])
    .then(({rows}) => {
        if (!rows[0]) return Promise.reject({statusCode: 404, msg: 'Sorry, there is no review with that ID.'})
        return db.query(`
        SELECT * FROM comments
        WHERE review_id = $1
        `, [review_id])
    })
    .then(({rows}) =>  rows)
}


exports.addComment = (review_id, author, body) => {
    console.log(review_id)
    return db.query(`
    INSERT INTO comments
    (author, body, review_id)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `, [author, body, parseInt(review_id)])
    .then(({rows}) => rows[0])
}


exports.removeComment = (comment_id) => {
    return db.query(`
    DELETE FROM comments
    WHERE comment_id = $1
    ` [comment_id])
}