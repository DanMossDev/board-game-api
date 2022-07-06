const express = require('express')
const { //CATEGORIES CONTROLLER
    getCategories,
} = require('../controllers/categoryController')

const router = express.Router()

router
    .route('')
    .get(getCategories)

module.exports = router