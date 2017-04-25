import axios from 'axios'

const GET = 'GET_PRODUCTS'

export const get = products => ({type: GET, products})


export default function(products = [], action) {
  switch (action.type) {
  case GET:
    return action.products
  default:
    return products
  }
}

export const fetchProducts = (id) => dispatch => {
  console.log('id in products', id)
  axios.get(`/api/planets/${id}`)
  .then(res => dispatch(get(res.data)))
  .catch(err => console.error('Error fetching the planets products', err))
}

