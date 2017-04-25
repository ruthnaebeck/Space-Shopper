import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_ORDERS'

/* ------------- ACTION CREATER ---------------- */

export const get = orders => ({type: GET, orders})

/* ------------- REDUCERS ---------------- */

export default function reducer(orders = [], action) {
  switch (action.type) {
  case GET:
    return action.orders
  default:
    return orders
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchOrders = () => dispatch => {
  axios.get('/api/users/orders')
  .then(res => dispatch(get(res.data)))
  .catch(err => console.error('Error fetchOrders', err))
}
