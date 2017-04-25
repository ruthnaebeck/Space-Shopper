import React from 'react'
import { logout } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'

class MyAccount extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      <button onClick={evt => {
        this.props.logout()
        browserHistory.push('/')
      }
      }> Logout </button>
      <h3>Past Orders</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.props.orders.map((order) =>
            <tr key={order.id}>
              <td><Link to={`/users/orders/${order.id}`}>{order.id}</Link></td>
              <td>{order.status}</td>
            </tr>)}
        </tbody>
      </table>
    </div>)
  }
}

/* ------------- CONTAINER --------------- */

const mapStateToProps = ({orders}) => ({orders})
const mapDispatch = { logout }

export default connect(mapStateToProps, mapDispatch)(MyAccount)
