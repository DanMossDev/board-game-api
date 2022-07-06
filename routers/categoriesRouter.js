const express = require('express')
const { //CATEGORIES CONTROLLER
    getCategories,
    postCategory
} = require('../controllers/categoryController')

const router = express.Router()

router
    .route('')
    .get(getCategories)
    .post(postCategory)

module.exports = router