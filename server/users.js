'use strict'

const db = require('APP/db')
const User = db.model('users')
const Order = db.model('orders')
const Item = db.model('items')
const Product = db.model('products')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    forbidden('listing users is not allowed'),
    (req, res, next) =>
      User.findAll()
        .then(users => res.json(users))
        .catch(next))
  .post('/',
    (req, res, next) =>
      User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/orders',
    mustBeLoggedIn,
    (req, res, next) => {
      const user = req.user || req.session.user
      Order.findAll({
        where: {
          user_id: user.id,
          status: 'complete'
        }
      })
      .then(orders => res.json(orders))
      .catch(next)
    })
  .get('/orders/:id',
    mustBeLoggedIn,
    (req, res, next) => {
      const user = req.user || req.session.user
      Order.findOne({
        where: {
          id: req.params.id,
          user_id: user.id
        },
        include: [
          {
            model: Item, include: [Product]
          }
        ]
      })
      .then(order => res.json(order))
      .catch(next)
    })
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next))
