'use strict'

const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/planets', require('./planets'))
  .use('/cart', require('./cart'))
  .get('/session', (req, res, next) => {
    req.session.cart = {
      id: 1,
      items: [{product: {title: 'Mars Hotel'}, productId: 1, qty: 1, price: 3.99}]
    }
    res.send(JSON.stringify(req.session.cart))
  })

// No routes matched? 404.
api.use((req, res) => res.status(404).end())


  // .get('/session', (req, res, next) => {
  //   req.session.cart = [{productId: 1, qty: 1}, {productId: 2, qty: 2}]
  //   console.log('Add to Session' + req.session.cart)
  //   res.status(200).send('Added to Cart ' + JSON.stringify(req.session.cart))
  // })
  // .get('/test', (req, res, next) => {
  //   console.log('Print Session', req.session.cart)
  //   res.send('Print Cart: ' + JSON.stringify(req.session.cart))
  // })
