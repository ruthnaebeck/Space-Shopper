// const db = require('APP/db')
// const Product = db.model('products')

// WE CAN MOVE PRODUTS ROUTES HERE IF NEEDED, need to reconfigure req.params.categoryId

// module.exports = require('express').Router()
//   .get('/', (req, res, next) => {
//     console.log('params in Products', req.params.categoryId)
//     Product.findAll({
//       where: {
//         category_id: req.params.categoryId
//       }
//     })
//       .then(products => res.json(products))
//       .catch(next)
//   })
