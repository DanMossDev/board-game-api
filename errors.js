exports.badPath = (req, res) => {
    res.status(400).send({msg: 'That is not a valid endpoint, please refer to documentation for a list of valid endpoints'})
}

exports.customError = (err, req, res, next) => {
    if (err.statusCode && err.msg) {
        res.status(err.statusCode).send({msg: err.msg})
    } else next(err)
}

exports.psqlError = (err, req, res, next) => {
    
    switch (err.code) {
        case '22P02':
            res.status(400).send({msg: "Input of incorrect data type."})
            break
        case '23503':
            res.status(404).send({msg: err.detail})
            break
        case '23502':
            //
            break
        default:
            next(err)
            break
    }
}

exports.unhandledErrors = (err, req, res, next) => {
    console.log(err)
    res.status(500).send("Unhandled error, whoops!")
}