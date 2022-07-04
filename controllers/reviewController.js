const {
    fetchReview
} = require('../models/reviewModel')

exports.getReview = (req, res, next) => {
    const {review_id} = req.params

    fetchReview(review_id)
    .then(review => {
        res.status(200).send(review)
    })
    .catch(err => next(err))
}