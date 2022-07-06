const {
    fetchUsers,
    fetchUser
} = require('../models/userModel')

exports.getUsers = async (req, res, next) => {
    try {
    const users = await fetchUsers()
    res.status(200).send(users)
    } catch (err) { next(err) }
}

exports.getUser = async (req, res, next) => {
    const {username} = req.params
    try {
    const user = await fetchUser(username)
    res.status(200).send(user)
    } catch (err) { next(err) }
}