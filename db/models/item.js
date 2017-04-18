'use strict'

const {STRING, INTEGER, DOUBLE} = require('sequelize')

module.exports = db => db.define('items', {
  qty: INTEGER,
  price: DOUBLE
})

module.exports.associations = (Item, {Order, Product}) => {
  Item.belongsTo(Order)
  Item.belongsTo(Product)
}
