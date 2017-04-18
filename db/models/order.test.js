'use strict'
const Promise = require('bluebird')
const db = require('APP/db')
  , { User, Product, Order, Category, Item } = db
  , { expect } = require('chai')

/* global describe it before afterEach beforeEach */

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
      Category.create({
        name: 'Mars',
        image: 'mars.jpg'
      }),
      Product.create({
        title: 'item1',
        description: 'example',
        // category_id: 1,
        price: 12,
        invQty: 4,
        image: 'mars.jpg'
      }),
      Product.create({
        title: 'item2',
        description: 'example2',
        // category_id: 1,
        price: 5,
        invQty: 2,
        image: 'venus.jpg'
      })
    ])
  )

  afterEach('Drop and Recreate Tables', () => db.sync({ force: true }))

  describe('Check Users and Products', () => {
    it('Created a User with userId 1', () => {
      User.findAll({})
        .then(users => {
          expect(users.length).to.equal(1)
          expect(users[0].id).to.equal(1)
        })
    })
    it('Created Mars Category', () => {
      Category.findAll({})
        .then(categories => {
          expect(categories.length).to.equal(1)
          expect(categories[0].name).to.equal('Mars')
        })
    })
    it('Created 2 Products', () => {
      Product.findAll({})
        .then(products => {
          expect(products.length).to.equal(2)
        })
    })
  })

  describe('Create an Order with 2 items', () => {
    beforeEach('Create Order', () =>
      Order.create({
        status: 'active',
        user_id: 1,
        items: [
          {
            qty: 2,
            price: 15,
            product_id: 2
          },
          {
            qty: 1,
            price: 10,
            product_id: 1
          }
        ]
      }, {include: [Item]})
      .then(order => order)
    )
    it('Order Created', () =>
      Order.findAll({})
        .then(orders => {
          expect(orders.length).to.equal(1)
        })
    )
    it('Items Created', () =>
      Item.findAll({})
        .then(items => {
          expect(items.length).to.equal(2)
          expect(items[0].order_id).to.equal(items[1].order_id)
          expect(items[0].order_id).to.not.equal(undefined)
          expect(items[1].order_id).to.not.equal(undefined)
        })
    )
  })
})
