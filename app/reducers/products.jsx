import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_PRODUCTS'

/* ------------- ACTION CREATER ---------------- */

export const get = products => ({type: GET, products})

/* ------------- REDUCERS ---------------- */

export default function(products = [], action) {
  switch (action.type) {
  case GET:
    return action.products
  default:
    return products
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchProducts = (id) => dispatch => {
  console.log('id in products', id)
  axios.get(`/api/planets/${id}`)
  .then(res => dispatch(get(res.data)))
  .catch(err => console.error('Error fetching the planets products', err))
}
