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
    Item.create(req.body, { include: [Product] })
      .then(item => res.json(item))
      .catch(next)
  }) // ***** TO DO: Refactor using above 'use' statement **** //
  .delete('/:pId', (req, res, send) => {
    var pId = req.params.pId
    var items = req.session.cart.items
    if (req.user) {
      Item.destroy({
        where: { product_id: pId }
      })
        .then(() => res.sendStatus(204))
    } else {
      var idx = -1
      for (var i = 0; i < items.length; i++) {
        if (items[i].productId === pId) idx = i
      }
      items.splice(idx, 1)
      res.sendStatus(204)
    }
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
