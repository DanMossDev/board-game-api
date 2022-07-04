const express = require('express')
const { //CATEGORIES CONTROLLER
    getCategories
} = require('./controllers/categoryController')

const { //ERROR HANDLING
    badPath
} = require('./errors')

const app = express()

app.use(express.json())

app.get('/api/categories', getCategories)

app.use('*', badPath)

module.exports = app