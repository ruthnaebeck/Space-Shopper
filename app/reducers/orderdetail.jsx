import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_ORDER_DETAIL'

/* ------------- ACTION CREATER ---------------- */

export const get = orderdetail => ({type: GET, orderdetail})

/* ------------- REDUCERS ---------------- */

export default function reducer(orderdetail = {}, action) {
  switch (action.type) {
  case GET:
    return action.orderdetail
  default:
    return orderdetail
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchOrderDetail = (id) => dispatch => {
  axios.get(`/api/users/orders/${id}`)
  .then(res => dispatch(get(res.data)))
  .catch(err => console.error('Error fetching the order details', err))
}
