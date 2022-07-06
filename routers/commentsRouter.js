const express = require('express')
const { //COMMENTS CONTROLLER
    deleteComment
} = require('../controllers/commentController')

const router = express.Router()

router
    .route('/:comment_id')
    .delete(deleteComment)

module.exports = router