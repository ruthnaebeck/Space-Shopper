import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

export const Order = (props) => (
  <div>
      <h3>Order Details for Order#{props.order.id}</h3>
      <h4>Order Status: {props.order.status}</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Date Ordered</th>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.order.items.map((item) =>
            <tr key={item.id}>
              <td>{item.updated_at}</td>
              <td><Link to={`/products/${item.product_id}`}>{item.product.title}</Link></td>
              <td>{item.qty}</td>
              <td>{item.price * item.qty}</td>
            </tr>)}
          <tr>
            <td></td>
            <td></td>
            <td>Subtotal</td>
            <td>{totalPrice(props.order.items)}</td>

          </tr>
        </tbody>
      </table>
    </div>)

  const totalPrice = (items) => {
    if (items) {
      return items.reduce((acc, item) => acc + (item.price * item.qty), 0)
    }
  }

/* ------------- CONTAINER --------------- */

const mapStateToProps = ({order}) => ({order})
const mapDispatch = null

export default connect(mapStateToProps, mapDispatch)(Order)