'use strict'
// downloads
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
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
import Checkout from './components/Checkout'
import MyAccount from './components/MyAccount'
import ThankYou from './components/ThankYou'
import Order from './components/Order'

// dispatchers
import { fetchPlanets } from './reducers/planets'
import { fetchProducts } from './reducers/products'
import { fetchProduct } from './reducers/product'
import { fetchOrder } from './reducers/order'
import { fetchOrders } from './reducers/orders'
import { getReviews } from './reducers/reviews'
import { fetchOrderDetail } from './reducers/orderdetail'

const Routes = ({ fetchData, onPlanetEnter, onProductEnter, onOrderEnter, onMyAccountEnter }) => (
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={fetchData}>
      <IndexRoute component={Planets} />
      <Route path="/planets" component={Planets} />
      <Route path="/planets/:categoryId" component={Products} onEnter={onPlanetEnter} />
      <Route path="/products/:productId" component={Product} onEnter={onProductEnter} />
      <Route path="/cart" component={Cart} />
      <Route path="/login" component={Login} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/myaccount" component={MyAccount} onEnter={onMyAccountEnter} />
      <Route path="/orderConfirmation" component={ThankYou} />
      <Route path="/users/orders/:id" component={Order} onEnter={onOrderEnter} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
)

/* ------------- CONTAINER ---------------- */

const mapStateToProps = null
const mapDispatch = dispatch => ({
  fetchData: () => {
    dispatch(fetchPlanets())
    dispatch(fetchOrder())
  },
  onProductEnter: (nextRouterState) => {
    const productId = nextRouterState.params.productId
    dispatch(fetchProduct(productId))
  },
  onPlanetEnter: (nextRouterState) => {
    const planetId = nextRouterState.params.categoryId
    dispatch(fetchProducts(planetId))
  },
  onOrderEnter: (nextRouterState) => {
    const orderId = nextRouterState.params.id
    dispatch(fetchOrderDetail(orderId))
  },
  onMyAccountEnter: (nextRouterState) => {
    dispatch(fetchOrders())
  },
})

export default connect(mapStateToProps, mapDispatch)(Routes)
