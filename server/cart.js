'use strict'

const db = require('APP/db')
const Product = db.model('products')
const Order = db.model('orders')
const Item = db.model('items')
const User = db.model('users')

module.exports = require('express').Router()
  .use((req, res, next) => {
    // console.log('req.session in cart routes', req.session)
    if (req.session.cartId) {
      Order.findOne({
        where: {
          id: req.session.cartId
        },
        include: [{ model: Item, include: [Product] }]
      })
      .then((order) => {
        req.cart = order
        next()
        return null
      })
      .catch(next)
    } else {
      Order.create({ status: 'pending' })
        .then((order) => {
          req.cart = order // add req.session.user = req.user (passed down to subsequent routes)
          req.session.cartId = order.id
          next()
        })
        .catch(next)
    }
  })
  .get('/', (req, res, next) => {
    res.status(200).json(req.cart)
  })
  .post('/', (req, res, next) => {
    Item.create(req.body)
    .then(item => item)
    .then(item =>
      Item.findOne({
        where: {id: item.id},
        include: [Product]
      })
    )
    .then(item => res.json(item))
    .catch(next)
  })
  .delete('/:oId/:pId', (req, res, next) => {
    Item.destroy({
      where: {
        product_id: req.params.pId,
        order_id: req.params.oId
      }
    })
    .then(() => res.sendStatus(204))
    .catch(next)
  })
  .post('/checkout',
    (req, res, next) => {
      let newUser = req.user || req.session.user
      if (newUser) {
        return next()
      }

      User.create({
        accountType: 'guest',
        email: req.body.email.value
      })
      .then(user => {
        newUser = user
        next()
      })
      .catch(next)
    },
    (req, res, next) => {
      return Order.findOne({
        where: {
          id: req.session.cartId
        },
        include: [{ model: Item, include: [Product] }]
      })
      .then(order => {
        let newUser = req.user || req.session.user
        req.session.cartId = null // this is resetting the cartId
        req.cart = null // this is clearing the cart
        return order.update({ status: 'complete', user_id: newUser.id }) // set user_id to req.user.id(?) - req.user set at the '.use' route above
      })
      .then((order) => {
        order.items.forEach((item) => {
          Product.find({
            where: {
              id: item.product_id
            }
          })
          .then((product) => {
            const currentQty = product.invQty
            const newQty = currentQty - item.qty
            product.update({invQty: newQty})
          })
          .catch(next)
        })
      })
      .then(order => {
        res.sendStatus(204)
      })
      .catch(next)
    })

    // ***** TODO **** //
    // ***** (if not logged in) create user with req.body from checkout page ***** //
    // ***** (if logged in) find user & associate to the order ***** //

    // LOW PRIORITY
    // ***** TODO: send email to user after submitted ***** //
