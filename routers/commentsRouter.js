const express = require('express')
const { //COMMENTS CONTROLLER
    deleteComment,
    patchComment
} = require('../controllers/commentController')

const router = express.Router()

router
    .route('/:comment_id')
    .delete(deleteComment)
    .patch(patchComment)

module.exports = router