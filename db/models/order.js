'use strict'

const {STRING, INTEGER, DOUBLE} = require('sequelize')

module.exports = db => db.define('orders', {
  orderNumber: STRING,
  status: STRING,
  qty: INTEGER,
  price: DOUBLE
})

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User)
}
