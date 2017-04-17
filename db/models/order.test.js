'use strict'
const Promise = require('bluebird')
const db = require('APP/db')
  , { User, Product, Order } = db
  , { expect } = require('chai')

/* global describe it before afterEach */

describe('Order', () => {
  before('Await database sync', () => db.didSync)
  beforeEach('Create a user and 2 products', function () {
    return Promise.all([
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
  }
  )
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('creating an order with 2 items', () => {
    beforeEach('creating orders', function() {
      return Promise.all([
        Order.create({
          status: 'active',
          qty: 1,
          price: 10,
          userId: 1,
          productId: 1
        }),
        Order.create({
          status: 'active',
          qty: 2,
          price: 15,
          userId: 1,
          productId: 2
        })
      ])
    })
    it('checks whether the orderIds are the same', () =>
    Order.findAll({})
    .then(orders => {
      expect(orders[0].orderId).to.equal(orders[1].orderId)
      expect(orders[0].orderId).to.equal(1)
    }))
  })
})
