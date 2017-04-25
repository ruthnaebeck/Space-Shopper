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

// dispatchers
import { fetchPlanets } from './reducers/planets'
import { fetchProducts } from './reducers/products'
import { fetchProduct } from './reducers/product'
import { fetchOrder } from './reducers/order'
import { getReviews } from './reducers/reviews'

const Routes = ({ fetchData, onPlanetEnter, onProductEnter }) => (
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={fetchData}>
        <IndexRoute component={Planets} />
        <Route path="/planets" component={Planets} />
        <Route path="/planets/:categoryId" component={Products} onEnter={onPlanetEnter}/>
        <Route path="/products/:productId" component={Product} onEnter={onProductEnter}/>
        <Route path="/cart" component={Cart} />
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
  }
})

export default connect(mapStateToProps, mapDispatch)(Routes)
