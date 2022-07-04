exports.badPath = (req, res) => {
    res.status(400).send({msg: 'That is not a valid endpoint, please refer to documentation for a list of valid endpoints'})
}

exports.customError = (err, req, res, next) => {
    if (err.statusCode && err.msg)
    res.status(err.statusCode).send({msg: err.msg})
    next(err)
}

exports.psqlError = (err, req, res, next) => {
    switch (err.code) {
        case '22P02':
            res.status(400).send({msg: "Review ID of incorrect data type. Did you mean to enter an integer?"})
            break
        default:
            next(err)
            break
    }
}