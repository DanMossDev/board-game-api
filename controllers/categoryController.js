const {
    fetchCategories,
    addCategory
} = require('../models/categoryModel')


exports.getCategories = async (req, res, next) => {
    try {
    const categories = await fetchCategories()
    res.status(200).send(categories)
    } catch (err) { next(err) }
}

exports.postCategory = async (req, res, next) => {
    const {slug, description} = req.body
    if (!slug || !description) next({statusCode: 400, msg: "The post body must include slug and description properties"})
    try {
        const category = await addCategory(slug, description)
        res.status(201).send(category)
    } catch (err) { next(err) }
}