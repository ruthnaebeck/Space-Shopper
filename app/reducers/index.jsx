import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  planets: require('./planets').default,
  order: require('./order').default,
  orderdetail: require('./orderdetail').default,
  orders: require('./orders').default,
  products: require('./products').default,
  product: require('./product').default,
  reviews: require('./reviews').default
})

export default rootReducer
