'use strict'

const {STRING, TEXT, DOUBLE, INTEGER} = require('sequelize')

module.exports = db => db.define('products', {
  title: STRING,
  description: TEXT,
  price: DOUBLE,
  invQty: INTEGER,
  image: STRING
})

module.exports.associations = (Product, {Review, Category, Item}) => {
  Product.hasMany(Review)
  Product.belongsTo(Category)
  Product.hasMany(Item)
}
