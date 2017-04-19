import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

export const Product = (props) => {
  const product = props.selectedProduct
  const qty = product.invQty
  return (
    <div>
      <h2> {product.title} </h2>
      <div className="col-md-6" id="productImage">
        <img src={product.image} />
          <div>
            <span className="price">${product.price}</span>
          </div>
      </div>
      <div className="col-md-6">
        <h5>Description: </h5>
        <p>{product.description}</p>
        <label> Quantity </label>
        <select>
          <option> </option>
          {generateOptions(qty)}
        </select>
        <div>
          <button type='submit' className='btn btn-success' onClick={() => {}}> Add To Cart </button>
        </div>
      </div>
    </div>
  )
}

// It generates a drop down menu for the available qty of the product.
const generateOptions = (qty) => {
  const result = []
  let i = 1
  while (i <= qty) {
    result.push(<option key={i} className='qty'> {i} </option>)
    i++
  }
  return result
}


const mapStateToProps = (state) => {
  // will need to check our state once connected to DB
  console.log('selected product from state', state.products.selectedProduct)
  return {
    selectedProduct: state.products.selectedProduct,
  }
}

// const mapDispatchToProps = (dispatch) => {
// }

export default connect(
  mapStateToProps
)(Product)
