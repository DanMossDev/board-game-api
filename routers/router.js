const express = require('express')
const reviewRouter = require('./reviewsRouter')
const commentsRouter = require('./commentsRouter')
const categoriesRouter = require('./categoriesRouter')
const usersRouter = require('./usersRouter')
const {root, paths} = require('../controllers/rootController')

const router = express.Router()

router
    .route('')
    .get(paths)

router
    .use('/reviews', reviewRouter)

router
    .use('/comments', commentsRouter)

router
    .use('/categories', categoriesRouter)

router
    .use('/users', usersRouter)


module.exports = router