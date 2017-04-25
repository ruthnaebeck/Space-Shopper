import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const SELECT_PRODUCT = 'SELECT_PRODUCT'
const CREATE = 'CREATE_REVIEW'

/* ------------- ACTION CREATER ---------------- */

export const selectProduct = product => ({type: SELECT_PRODUCT, product})
export const create = review => ({type: CREATE, review})

/* ------------- REDUCERS ---------------- */

export default function reducer(product = {}, action) {
  switch (action.type) {
  case SELECT_PRODUCT:
    return action.product
  case CREATE:
    const newProduct = Object.assign({}, product)
    newProduct.reviews = [...product.reviews, action.review]
    return newProduct
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

export const createReview = (review, id) => dispatch => {
  axios.post(`/api/products/${id}`, review)
  .then(res => dispatch(create(res.data)))
  .catch(err => console.error('error creating review', err))
}