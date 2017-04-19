import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  planets: require('./planets').default,
  products: require('./products').default,
  reviews: require('./reviews').default
})

export default rootReducer
