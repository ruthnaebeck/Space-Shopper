'use strict'

const {STRING, INTEGER, DOUBLE} = require('sequelize')

module.exports = db => db.define('orders', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: STRING,
  qty: INTEGER,
  price: DOUBLE
})

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User)
  Order.belongsTo(Order, {as: 'order'})
}
