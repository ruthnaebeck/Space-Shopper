'use strict'
// downloads
import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios'

// components
import store from './store'
import App from './components/App'
import Planets from './components/Planets'
import Products from './components/Products'
import Product from './components/Product'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import Login from './components/Login'
import MyAccount from './components/MyAccount'

// dispatchers
import { getPlanets } from './reducers/planets'
import { getProducts } from './reducers/products'
import { fetchOrder } from './reducers/order'
import { getReviews } from './reducers/reviews'

const fetchPlanets = () => {
  axios.get('/api/planets')
    .then(function(res) {
      return res.data
    })
    .then((planets) => store.dispatch(getPlanets(planets)))
    .catch()
}

const onAppEnter = () => {
  fetchPlanets()
  fetchCart()
}

const onPlanetEnter = ({params: {categoryId}}) => {
  axios.get(`/api/planets/${categoryId}`)
  .then(function(res) {
    return res.data
  })
  .then((products) => store.dispatch(getProducts(products)))
  .catch()
}

const onProductEnter = ({params: {productId}}) => {
  axios.get(`/api/products/${productId}`)
  .then(function(res) {
    return res.data
  })
    .then((reviews) => store.dispatch(getReviews(reviews)))
    .catch()
}

const fetchCart = function(nextRouterSTate) {
  store.dispatch(fetchOrder())
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onAppEnter}>
        <IndexRoute component={Planets} />
        <Route path="/planets" component={Planets} />
        <Route path="/planets/:categoryId" component={Products} onEnter={onPlanetEnter}/>
        <Route path="/products/:productId" component={Product} onEnter={onProductEnter}/>
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/myaccount" component={MyAccount} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)

/* ------------- CONTAINER ---------------- */

// const mapStateToProps = null;
// const mapDispatch = dispatch => ({
//   onCartEnter: () => {
//     dispatch(fetchItems())
//   }
// })

// export default connect(mapStateToProps, mapDispatch)(Routes)
