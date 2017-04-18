'use strict'
const Promise = require('bluebird')
const db = require('APP/db')
  , { User, Product, Order } = db
  , { expect } = require('chai')

/* global describe it before afterEach */

describe('Order', () => {
  before('Await database sync', () => db.didSync)
  beforeEach('Create a user and 2 products', () =>
    Promise.all([
      User.create({
        name: 'Cigdem',
        accountType: 'User',
        streetAddress: 'Crescent',
        city: 'NY',
        state: 'NY',
        zip: '11111',
        cardNumber: '1234567890123456',
        expMonth: '12',
        expYear: '2017',
        cardType: 'Visa',
        cvv: '123',
        email: 'cigdem@test.com'
      }),
      Product.create({
        title: 'item1',
        description: 'example',
        category: 'mars',
        price: 12,
        invQty: 4,
        image: 'mars.jpg'
      }),
      Product.create({
        title: 'item2',
        description: 'example2',
        category: 'venus',
        price: 5,
        invQty: 2,
        image: 'venus.jpg'
      })
    ])
  )

  afterEach('Drop and Recreate Tables', () => db.sync({ force: true }))

  describe('Create an Order with 2 items', () => {
    beforeEach('Create Order', () =>
      Promise.all([
        Order.create({
          status: 'active',
          qty: 1,
          price: 10,
          user_id: 1,
          product_id: 1
        }),
        Order.create({
          status: 'active',
          qty: 2,
          price: 15,
          user_id: 1,
          product_id: 2
        })
      ])
    )
    it('Created a User with userId 1', () => {
      User.findAll({})
        .then(users => {
          expect(users.length).to.equal(1)
          expect(users[0].id).to.equal(1)
        })
    })
    it('Created 2 Products with productId 1 & 2', () => {
      Product.findAll({})
        .then(products => {
          expect(products[0].id).to.equal(1)
          expect(products[1].id).to.equal(2)
        })
    })
    it('Created Order with proper orderId', () =>
      Order.findAll({})
        .then(orders => {
          console.log(orders)
          expect(orders.length).to.equal(2)
          expect(orders[0].orderId).to.equal(orders[1].orderId)
          expect(orders[0].orderId).to.not.equal(undefined)
          expect(orders[2].orderId).to.not.equal(undefined)
        })
      )
  })
})
