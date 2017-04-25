import axios from 'axios'

const GET = 'GET_PLANETS'

export const get = (planets) => ({ type: GET, planets })


export default function reducer(planets = [], action) {
  switch (action.type) {
  case GET:
    return action.planets
  default:
    return planets
  }
}
export const fetchPlanets = () => dispatch => {
  axios.get('/api/planets')
  .then(res => {
    dispatch(get(res.data))
  })
  .catch(err => console.error('Error fetchPlanets', err))
}
