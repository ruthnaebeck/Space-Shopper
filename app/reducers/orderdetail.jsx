import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_ORDER'

/* ------------- ACTION CREATER ---------------- */

export const get = order => ({type: GET, order})

/* ------------- REDUCERS ---------------- */

export default function reducer(order = {}, action) {
  switch (action.type) {
  case GET:
    return action.order
  default:
    return order
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchOrderDetail = (id) => dispatch => {
  axios.get(`/api/users/orders/${id}`)
  .then(res => dispatch(get(res.data)))
  .catch(err => console.error('Error fetching the order details', err))
}
