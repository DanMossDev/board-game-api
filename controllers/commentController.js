const {
    removeComment
} = require('../models/commentModel')


exports.deleteComment = async (req, res, next) => {
    const {comment_id} = req.params

    try {
    await removeComment(comment_id)
    res.status(204).send()
    }
    catch(err) {next(err)}
}