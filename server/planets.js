const db = require('APP/db')
const Planet = db.model('planets')

module.exports = require('express').Router()
  .get('/',  (req, res, next) =>
      Planet.findAll()
        .then(planets => res.json(planets))
        .catch(next))