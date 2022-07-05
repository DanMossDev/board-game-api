const {
    addComment,
    fetchComments,
    removeComment
} = require('../models/commentModel')

exports.getComments = async (req, res, next) => {
    const {review_id} = req.params

    try {
    const comments = await fetchComments(review_id)
    res.status(200).send({comments})
    } catch (err) { next(err) }
}

exports.postComment = async (req, res, next) => {
    const {review_id} = req.params
    const {username, body} = req.body

    if (!username || !body) next({statusCode: 400, msg: "Patch body must contain a username and body text for the comment"})
    
    try {
    const comment = await addComment(review_id, username, body)
    res.status(201).send(comment)
    } catch (err) { next(err) }
}


exports.deleteComment = async (req, res, next) => {
    const {comment_id} = req.params

    try {
    await removeComment(comment_id)
    res.status(204).send()
    }
    catch(err) {next(err)}
}