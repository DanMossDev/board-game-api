const db = require('../db/connection')

exports.fetchReview = (review_id) => {
    return db.query(`
    SELECT * FROM reviews
    WHERE review_id = $1 
    `, [review_id])
    .then(({rows}) => {
        if (rows[0]) return rows[0]
        else return Promise.reject({statusCode: 404, msg: 'Sorry, there is no review with that ID.'})
    })
}