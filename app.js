const express = require('express')
const { //CATEGORIES CONTROLLER
    getCategories,
} = require('./controllers/categoryController')
const { //REVIEWS CONTROLLER
    getReview,
    getReviews,
    patchReview
} = require('./controllers/reviewController')
const {
    getUsers
} = require('./controllers/userController')

const { //ERROR HANDLING
    badPath,
    psqlError,
    customError
} = require('./errors')


const app = express()

app.use(express.json())

//GET
app.get('/api/categories', getCategories)

app.get('/api/reviews', getReviews)

app.get('/api/reviews/:review_id', getReview)

app.get('/api/users', getUsers)


//PATCH
app.patch('/api/reviews/:review_id', patchReview)

//ERROR HANDLING
app.all('*', badPath)

app.use(customError)

app.use(psqlError)

module.exports = app