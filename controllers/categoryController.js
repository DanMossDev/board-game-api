const {
    fetchCategories
} = require('../models/categoryModel')


exports.getCategories = (req, res, next) => {
    fetchCategories()
    .then(categories => {
        res.send(categories)
    }) 
}