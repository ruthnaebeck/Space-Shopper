import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_PLANETS'

/* ------------- ACTION CREATER ---------------- */

export const get = (planets) => ({ type: GET, planets })

/* ------------- REDUCERS ---------------- */

export default function reducer(planets = [], action) {
  switch (action.type) {
  case GET:
    return action.planets
  default:
    return planets
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchPlanets = () => dispatch => {
  axios.get('/api/planets')
  .then(res => {
    dispatch(get(res.data))
  })
  .catch(err => console.error('Error fetchPlanets', err))
}
