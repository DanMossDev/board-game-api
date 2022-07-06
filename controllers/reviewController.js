const {
    fetchReviews,
    fetchReview,
    updateReview,
    addReview,
    fetchComments,
    addComment
} = require('../models/reviewModel')

exports.getReviews = async (req, res, next) => {
    const {sort_by, order, category} = req.query
    try {
    const reviews = await fetchReviews(sort_by, order, category)
    res.status(200).send(reviews)
    } catch (err) { next(err) }
}

exports.getReview = async (req, res, next) => {
    const {review_id} = req.params
    try {
    const review = await fetchReview(review_id)
    res.status(200).send(review)
    } catch (err) { next(err) }
}

exports.patchReview = async (req, res, next) => {
    const {review_id} = req.params
    const {inc_votes} = req.body
    
    if (!inc_votes) return next({statusCode: 400, msg: "Patch body must contain the number of incoming votes."})
    
    try {
    const review = await updateReview(review_id, inc_votes)
    res.status(200).send(review)
    } catch (err) { next(err) }
}

exports.postReview = async (req, res, next) => {
    if (!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('owner') || !req.body.hasOwnProperty('designer') || !req.body.hasOwnProperty('category') || !req.body.hasOwnProperty('review_body')) {
        return next({statusCode: 400, msg: "Patch body must contain title, owner, designer, category, and review_body properties"})
    }
    try {
    const review = await addReview(req.body)
    res.status(201).send(review)
    } catch (err) { console.log(err); next(err) }
}

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

    if (!username || !body) return next({statusCode: 400, msg: "Patch body must contain a username and body text for the comment"})
    
    try {
    const comment = await addComment(review_id, username, body)
    res.status(201).send(comment)
    } catch (err) { next(err) }
}