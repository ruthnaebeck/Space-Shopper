'use strict'

const {STRING, INTEGER, DOUBLE} = require('sequelize')

module.exports = db => db.define('orders', {
  status: STRING,
})

module.exports.associations = (Order, {User, Item}) => {
  Order.belongsTo(User)
  Order.hasMany(Item)
}
