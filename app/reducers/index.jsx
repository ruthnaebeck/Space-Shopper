import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  planets: require('./planets').default
})

export default rootReducer
