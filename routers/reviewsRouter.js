const express = require('express')
const { //REVIEWS CONTROLLER
    getReview,
    getReviews,
    patchReview,
    postReview,
    deleteReview,
    getComments,
    postComment
} = require('../controllers/reviewController')

const router = express.Router();

router
    .route('')
    .get(getReviews)
    .post(postReview)

router
    .route('/:review_id')
    .get(getReview)
    .patch(patchReview)
    .delete(deleteReview)

router
    .route('/:review_id/comments')
    .get(getComments)
    .post(postComment)

module.exports = router