import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

export const Product = (props) => {
  const product = props.selectedProduct
  const qty = product.invQty
  return (
    <div>
      <h3> {product.name} </h3>
      <img src={product.image} />
      <span>
        {product.price}
      </span>
      <label> Quantity </label>
      <select>
        <option> </option>
        {generateOptions(qty)}
      </select>
      <button type='submit' className='btn btn-success' onClick={() => {}}> Add To Cart </button>
    </div>
  )
}

// It generates a drop down menu for the available qty of the product.
const generateOptions = (qty) => {
  const result = []
  let i = 1
  while (i <= qty) {
    result.push(<option className='qty'> i </option>)
    i++
  }
  return result
}


const mapStateToProps = (state) => {
  // will need to check our state once connected to DB
  return {
    selectedProduct: state.products.selectedProduct,
  }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Product)
