const {
    fetchUsers
} = require('../models/userModel')

exports.getUsers = (req, res, next) => {
    fetchUsers()
    .then(users => {
        res.status(200).send(users)
    })
    .catch(err => next(err))
}