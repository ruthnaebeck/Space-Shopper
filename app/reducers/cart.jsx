import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_ORDER'

/* ------------- ACTION CREATER ---------------- */

const get = order => ({type: GET, order})

/* ------------- REDUCERS ---------------- */

export default function reducer(order = [], action) {
  switch (action.type) {
  case GET:
    return action.order
  default:
    return order
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchOrder = (id) => dispatch => {
  axios.get(`/api/cart`)
  .then(res => {
    dispatch(get(res.data))
  })
  .catch(err => console.error('Error fetchItems', err))
}
