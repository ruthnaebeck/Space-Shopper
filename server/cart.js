'use strict'

const db = require('APP/db')
const Product = db.model('products')
const Order = db.model('orders')
const Item = db.model('items')

module.exports = require('express').Router()
  .use((req, res, next) => {
    if (req.session.cartId) {
      Order.findOne({
        where: {
          id: req.session.cartId
        },
        include: [{ model: Item, include: [Product] }]
      })
      .then((order) => {
        req.cart = order
        // Receiving warning message:
        // a promise was created in a handler but was not returned from it
        // According to docs, it's because we aren't returning:
        // http://bluebirdjs.com/docs/warning-explanations.html#warning-a-promise-was-created-in-a-handler-but-was-not-returned-from-it
        next()
      })
      .catch(next)
    } else {
      Order.create({ status: 'pending' })
        .then((order) => {
          req.cart = order
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
  .post('/checkout', (req, res, next) => {
    Order.findOne({
      where: {
        id: req.body.id
      },
      include: [{ model: Item, include: [Product] }]
    })
    .then(order => {
      req.session.cartId = null // this is resetting the cartId
      req.cart = null
      return order.update({ status: 'complete' })
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
      })
    })
    // ***** TODO: add redirect to 'Your Order has been Submitted page / send email to user' ***** //
    .then(order => res.sendStatus(204))
    .catch(next)
  })
