import React from 'react'
import { connect } from 'react-redux'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const items = this.props.order.items || []
    return (
    <div>
      <h3>Shopping Cart</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Qty</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) =>
            <tr key={item.id}>
              <td>{item.product.title}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>
                <button id={item.id}
                        className="btn btn-default btn-xs">
                  <span id={item.id}
                        className="glyphicon glyphicon-trash">
                  </span>
                </button>
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>
    )
  }
}

/*------------- CONTAINER ---------------*/

const mapStateToProps = (order) => (order)
const mapDispatch = null

export default connect(mapStateToProps, mapDispatch)(Cart)
