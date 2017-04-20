import axios from 'axios'

const initialReviewState = {
  reviews: []
}

const GET_REVIEWS = 'GET_REVIEWS'



export const getReviews = function(reviews) {
  return {
    type: GET_REVIEWS,
    reviews: reviews
  }
}


export default function(state = initialReviewState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GET_REVIEWS:
    newState.reviews = action.reviews
    break
  default:
    return state
  }
  return newState
}
