const express = require('express')
const { //USERS CONTROLLER
    getUsers,
    getUser
} = require('../controllers/userController')

const router = express.Router()

router
    .route('')
    .get(getUsers)

router
    .route('/:username')
    .get(getUser)

module.exports = router