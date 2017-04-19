import axios from 'axios'

const initialProductState = {
  products: [],
  selectedProduct: {}
}

const GET_PRODUCTS = 'GET_PRODUCTS'
const SELECT_PRODUCT = 'SELECT_PRODUCT'


export const getProducts = function(products) {
  return {
    type: GET_PRODUCTS,
    products: products
  }
}

export const selectProduct = function(product) {
  return {
    type: SELECT_PRODUCT,
    selectedProduct: product
  }
}


export default function(state = initialProductState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GET_PRODUCTS:
    newState.products = action.products
    break
  case SELECT_PRODUCT:
    newState.selectedProduct = action.selectedProduct
    break
  default:
    return state
  }
  return newState
}
