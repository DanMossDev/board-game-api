const express = require('express')
const fs = require('fs/promises')
const { //CATEGORIES CONTROLLER
    getCategories,
} = require('./controllers/categoryController')
const { //REVIEWS CONTROLLER
    getReview,
    getReviews,
    patchReview
} = require('./controllers/reviewController')
const { //USERS CONTROLLER
    getUsers,
    getUser
} = require('./controllers/userController')
const { //COMMENTS CONTROLLER
    getComments,
    postComment,
    deleteComment
} = require('./controllers/commentController')

const { //ERROR HANDLING
    badPath,
    psqlError,
    customError
} = require('./errors')


const app = express()

app.use(express.json())

//GET
app.get('/api', async (req, res, next) => {
    try {
    const endpoints = await fs.readFile(`${__dirname}/endpoints.json`, "utf-8")
    res.status(200).send(endpoints)
    } catch (err) { next(err) }
})

app.get('/api/categories', getCategories)

app.get('/api/reviews', getReviews)

app.get('/api/reviews/:review_id', getReview)

app.get('/api/reviews/:review_id/comments', getComments)

app.get('/api/users', getUsers)


//PATCH
app.patch('/api/reviews/:review_id', patchReview)


//POST
app.post('/api/reviews/:review_id/comments', postComment)


//DELETE
app.delete('/api/comments/:comment_id', deleteComment)


app.get('/api/users/:username', getUser)


//ERROR HANDLING
app.all('*', badPath)

app.use(customError)

app.use(psqlError)

module.exports = app