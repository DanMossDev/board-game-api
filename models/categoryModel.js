const db = require('../db/connection')

exports.fetchCategories = () => {
    return db.query(`
    SELECT * FROM categories;
    `)
    .then(({rows}) => rows)
}

exports.addCategory = async (slug, description) => {
    const slugs = await db.query('SELECT slug FROM categories')
    let isUnique = true;
    
    slugs.rows.forEach(entry => {
        if (entry.slug === slug) isUnique = false
    })

    if (!isUnique) return Promise.reject({statusCode: 409, msg: "That slug already has a database entry"})
    else return db.query(`
    INSERT INTO categories
    (slug, description)
    VALUES
    ($1, $2)
    RETURNING *
    `, [slug, description])
    .then(({rows}) => rows[0])
}