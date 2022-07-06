const express = require('express')
const { //REVIEWS CONTROLLER
    getReview,
    getReviews,
    patchReview,
    getComments,
    postComment
} = require('../controllers/reviewController')

const router = express.Router();

router
    .route('')
    .get(getReviews)

router
    .route('/:review_id')
    .get(getReview)
    .patch(patchReview)

router
    .route('/:review_id/comments')
    .get(getComments)
    .post(postComment)

module.exports = router