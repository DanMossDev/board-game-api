const express = require('express')
const { //CATEGORIES CONTROLLER
    getCategories,
} = require('./controllers/categoryController')
const { //REVIEWS CONTROLLER
    getReview
} = require('./controllers/reviewController')

const { //ERROR HANDLING
    badPath,
    psqlError,
    customError
} = require('./errors')

const app = express()

app.use(express.json())

//GET
app.get('/api/categories', getCategories)

app.get('/api/reviews/:review_id', getReview)


//ERROR HANDLING
app.use('*', badPath)

app.use(customError)

app.use(psqlError)

module.exports = app