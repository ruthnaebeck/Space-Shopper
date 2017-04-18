const db = require('APP/db')
const Product = db.model('products')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
      Product.findAll({
        where: {
          category_id: req.params.categoryId
        }
      })
        .then(products => res.json(products))
        .catch(next))
