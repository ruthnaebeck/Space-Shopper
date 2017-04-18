import axios from 'axios'

const initialProductState = {
  products: []
}

const GET_PRODUCTS = 'GET_PRODUCTS'


export const getProducts = function(products) {
  return {
    type: GET_PRODUCTS,
    products: products
  }
}


export default function(state = initialProductState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GET_PRODUCTS:
    newState.products = action.products
    break
  default:
    return state
  }
  return newState
}
