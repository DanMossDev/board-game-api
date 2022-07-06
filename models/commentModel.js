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