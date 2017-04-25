import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const SELECT_PRODUCT = 'SELECT_PRODUCT'

/* ------------- ACTION CREATER ---------------- */

export const selectProduct = product => ({type: SELECT_PRODUCT, product})

/* ------------- REDUCERS ---------------- */

export default function reducer(product = {}, action) {
  switch (action.type) {
  case SELECT_PRODUCT:
    return action.product
  default:
    return product
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchProduct = (id) => dispatch => {
  axios.get(`/api/products/${id}`)
  .then(res => dispatch(selectProduct(res.data)))
  .catch(err => console.error('Error fetching the product', err))
}
