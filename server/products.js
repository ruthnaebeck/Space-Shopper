const db = require('APP/db')
const Product = db.model('products')
const Review = db.model('reviews')
const User = db.model('users')

// WE CAN MOVE PRODUTS ROUTES HERE IF NEEDED, need to reconfigure req.params.categoryId

module.exports = require('express').Router()
  .get('/:productId', (req, res, next) => {
    Review.findAll({
      where: {
        product_id: req.params.productId
      },
      include: [
        {
          model: User
        }
      ]
    })
      .then(reviews => res.json(reviews))
      .catch(next)
  })
