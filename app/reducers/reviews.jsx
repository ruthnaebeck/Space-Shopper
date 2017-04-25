import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET_REVIEWS = 'GET_REVIEWS'

/* ------------- ACTION CREATER ---------------- */

export const getReviews = function(reviews) {
  return {
    type: GET_REVIEWS,
    reviews: reviews
  }
}

/* ------------- REDUCERS ---------------- */

export default function(reviews = [], action) {
  switch (action.type) {
  case GET_REVIEWS:
    return action.reviews
  default:
    return reviews
  }
}
