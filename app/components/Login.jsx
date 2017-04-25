import React from 'react'
import { browserHistory } from 'react-router'

export const Login = ({ login, signup }) => (
  <div>
    <div className="col-md-6">
      <h2>LOG IN</h2>
      <form onSubmit={evt => {
        evt.preventDefault()
        login(evt.target.email.value, evt.target.password.value)
        browserHistory.push('/')
      } }>
        <div className = "form-group">
          <label>Email</label>
          <input name="email" />
        </div>
        <div className = "form-group">
          <label>Password</label>
          <input label="password" name="password" type="password" />
        </div>
        <input type="submit" value="Login" />
      </form>
      <div className="or buffer">
        <div className="back-line">
          <span>OR</span>
        </div>
      </div>
      <div className="buffer oauth">
        <p>
          <a
            target="_self"
            href="/api/auth/login/google"
            className="btn btn-social btn-google">
            <i className="fa fa-google" />
            <span>Log in with Google</span>
          </a>
        </p>
      </div>
    </div>
    <div className="col-md-6">
      <h2>SIGN UP</h2>
      <form onSubmit={evt => {
        evt.preventDefault()
        signup(evt.target.email.value, evt.target.password.value)
        browserHistory.push('/')
      } }>
        <div className = "form-group">
          <label>Email</label>
          <input name="email" />
        </div>
        <div className = "form-group">
          <label>Password</label>
          <input label="password" name="password" type="password" />
        </div>
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  </div>
)

import {login, signup} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login, signup},
)(Login)
