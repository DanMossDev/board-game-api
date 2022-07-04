const {
    fetchReviews,
    fetchReview,
    updateReview,
    addComment
} = require('../models/reviewModel')

exports.getReviews = (req, res, next) => {
    fetchReviews()
    .then(reviews => {
        res.status(200).send(reviews)
    })
}

exports.getReview = (req, res, next) => {
    const {review_id} = req.params

    fetchReview(review_id)
    .then(review => {
        res.status(200).send(review)
    })
    .catch(err => next(err))
}

exports.patchReview = (req, res, next) => {
    const {review_id} = req.params
    const {inc_votes} = req.body
    
    if (!inc_votes) next({statusCode: 400, msg: "Patch body must contain the number of incoming votes."})
    updateReview(review_id, inc_votes)
    .then(review => {
        res.status(200).send(review)
    })
    .catch(err =>  next(err))
}

exports.postComment = (req, res, next) => {
    const {review_id} = req.params
    const {username, body} = req.body

    if (!username || !body) next({statusCode: 400, msg: "Patch body must contain a username and body text for the comment"})
    addComment(review_id, username, body)
    .then(comment => {
        res.status(201).send(comment)
    })
    .catch(err => next(err))
}