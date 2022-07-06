const db = require('../db/connection')
const {createRef} = require('../db/seeds/utils')

exports.removeComment = (comment_id) => {
    return db.query(`
    DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *`, [comment_id]).then(({rowCount}) => {
        if (rowCount === 0) return Promise.reject({statusCode: 404, msg: "That comment doesn't exist"})
        
        return
    })
}

exports.updateComment = (comment_id, votes) => {
    return db.query(`
    SELECT votes FROM comments
    WHERE comment_id = $1
    `, [comment_id])
    .then(({rows}) => {
        if (!rows[0]) return Promise.reject({statusCode: 404, msg: 'Sorry, there is no comment with that ID.'})
        
        const currentVotes = rows[0].votes + votes

        return db.query(`
        UPDATE comments
        SET votes = $1
        WHERE comment_id = $2
        RETURNING *`, [currentVotes, comment_id])
    })
    .then(({rows}) => rows[0])
}