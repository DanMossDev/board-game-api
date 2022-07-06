const fs = require('fs/promises')

exports.root = (req, res, next) => {
    res.status(200).send({msg: "Thanks for using BeeGee! Visit the /api endpoint for a full list of endpoints and methods."})
}

exports.paths = async (req, res, next) => {
    try {
    const endpoints = await fs.readFile(`${__dirname}/../endpoints.json`, "utf-8")
    res.status(200).send(endpoints)
    } catch (err) { next(err) }
}