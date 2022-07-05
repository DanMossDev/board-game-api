const {
    fetchReviews,
    fetchReview,
    updateReview,
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
    
    if (!inc_votes) next({statusCode: 400, msg: "Patch body must contain the number of incoming votes."})
    
    try {
    const review = await updateReview(review_id, inc_votes)
    res.status(200).send(review)
    } catch (err) { next(err) }
}