import React from 'react'
import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'

export const MyAccount = ({ logout }) => (
  <div>
    <button onClick={evt => {
      logout()
      browserHistory.push('/')
    }
    }> Logout </button>
    </div>
)



export default connect(
  state => ({}),
  {logout},
)(MyAccount)
