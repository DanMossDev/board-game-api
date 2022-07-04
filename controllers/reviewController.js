const {
    fetchReviews,
    fetchReview,
    updateReview
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