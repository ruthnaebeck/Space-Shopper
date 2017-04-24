const db = require('APP/db')
const Product = db.model('products')
const Review = db.model('reviews')
const User = db.model('users')

module.exports = require('express').Router()
  .get('/:productId', (req, res, next) => {
    Product.findOne({
      where: {
        id: req.params.productId
      },
      include: [
        {
          model: Review, include: [User]
        }
      ]
    })
      .then(product => res.json(product))
      .catch(next)
  })
