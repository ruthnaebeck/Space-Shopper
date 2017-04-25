import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { selectProduct } from '../reducers/products'


export const Products = (props) => {
  const products = props.products || []
  return (
    <div className="products">
      {products.map((product) => {
        return (<div key={product.id} className= "products-product" style={{ backgroundImage: `url(${product.image})` }}>
          <Link to={`/products/${product.id}`} onClick={() => props.setProduct(product)}>
            <h2 className="productTitle">{product.title}</h2>
          </Link>
        </div>)
      })}
    </div>
  )
}

const mapStateToProps = ({products}) => ({products})
const mapDispatchToProps = (dispatch) => {
  return {
    setProduct(product) {
      dispatch(selectProduct(product))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
