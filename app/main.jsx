'use strict'
//downloads
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios'

// components
import store from './store'
import App from './components/App'
import Planets from './components/Planets'
import Products from './components/Products'
import NotFound from './components/NotFound'
import Cart from './components/Cart'

// dispatchers
import { getPlanets } from './reducers/planets'
import { getProducts } from './reducers/products'
import { fetchOrder } from './reducers/cart'

const onAppEnter = () => {
  axios.get('/api/planets') // test later after db
    .then(function(res) {
      return res.data
    })
    .then((planets) => store.dispatch(getPlanets(planets)))
}

const onPlanetEnter = () => {
  axios.get('/api/planets/:planetId')
  .then(function(res){
    return res.data
  })
  .then((products) => store.dispatch(getProducts(products)))
}

const onCartEnter = function(nextRouterSTate) {
  store.dispatch(fetchOrder()) // will need to pass in order Id
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onAppEnter}>
        <IndexRedirect to="/planets" />
        <Route path="/planets" component={Planets}>
          <Route path="planets/:planetId" component={Products} onEnter={onPlanetEnter}/>
        </Route>
        <Route path="/cart" component={Cart} onEnter={onCartEnter} />
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
