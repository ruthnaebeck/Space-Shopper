import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  planets: require('./planets').default,
  order: require('./cart').default
})

export default rootReducer
