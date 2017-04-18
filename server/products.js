const db = require('APP/db')
const Product = db.model('products')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
      Product.findAll({
        where: {
          id: req.params.planetId
        }
      })
        .then(products => res.json(products))
        .catch(next))
