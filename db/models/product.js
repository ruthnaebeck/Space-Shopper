'use strict'

const {STRING, TEXT, DOUBLE, INTEGER} = require('sequelize')

module.exports = db => db.define('products', {
  title: STRING,
  description: TEXT,
  category: STRING,
  price: DOUBLE,
  invQty: INTEGER,
  image: STRING
})

module.exports.associations = (Product, {User, Order, Review}) => {
  Product.belongsToMany(User, {through: Order})
  Product.hasMany(Review)
}
