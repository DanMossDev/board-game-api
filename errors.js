exports.badPath = (req, res) => {
    res.status(400).send({msg: 'That is not a valid endpoint, please refer to documentation for a list of valid endpoints'})
}