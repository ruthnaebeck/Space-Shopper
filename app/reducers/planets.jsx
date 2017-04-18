import axios from 'axios'

const initialPlanetState = {
  planets: []
}

const GET_PLANETS = 'GET_PLANETS'


export const getPlanets = function(planets) {
  return {
    type: GET_PLANETS,
    planets: planets
  }
}


export default function(state = initialPlanetState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GET_PLANETS:
    newState.planets = action.planets
    break
  default:
    return state
  }
  return newState
}
