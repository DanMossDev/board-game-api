const {
    removeComment,
    updateComment
} = require('../models/commentModel')


exports.deleteComment = async (req, res, next) => {
    const {comment_id} = req.params

    try {
    await removeComment(comment_id)
    res.status(204).send()
    }
    catch(err) {next(err)}
}

exports.patchComment = async (req, res, next) => {
    const {comment_id} = req.params
    const {inc_votes} = req.body

    if (!inc_votes) next({statusCode: 400, msg: "Patch body must contain the number of incoming votes."})

    try {
    const review = await updateComment(comment_id, inc_votes)
    res.status(200).send(review)
    } catch (err) { next(err) }
}