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
import NotFound from './components/NotFound'

// dispatchers
import {getPlanets} from './reducers/planets'

const onAppEnter = () => {
  axios.get('/api/planets') //fix later after db
    .then(function(res) {
      return res.data
    })
    .then((planets) => store.dispatch(getPlanets(planets)))
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onAppEnter}>
        <IndexRedirect to="/planets" />
        <Route path="/planets" component={Planets} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
