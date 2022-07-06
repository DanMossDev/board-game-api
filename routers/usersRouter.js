const express = require('express')
const { //USERS CONTROLLER
    getUsers
} = require('../controllers/userController')

const router = express.Router()

router
    .route('')
    .get(getUsers)

module.exports = router