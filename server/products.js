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
  .post('/:productId', (req, res, next) => {
    req.body.user_id = req.user.id
    if (req.user) {
      Review.create(req.body)
      .then(review =>
        Review.findOne({where: {id: review.id},
          include: [User]
        })
      )
      .then(review => res.json(review))
      .catch(next)
    } else res.sendStatus(403)
  })
