const {
    fetchCategories
} = require('../models/categoryModel')


exports.getCategories = (req, res, next) => {
    fetchCategories()
    .then(categories => {
        res.status(200).send(categories)
    }) 
}