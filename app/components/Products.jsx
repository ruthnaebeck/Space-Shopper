import React from 'react'
import { connect } from 'react-redux';

const Products = (props) => {
  return (
    <div>
      {props.products.map((product) => {
        return (<div key={product.id} className="col-md-4">
          <Link>
            <span><h3>{product.name}</h3>
             <img />
            </span>
          </Link>
        </div>)
      })}
    </div>
  )
}

// TODOS HERE:
// - for <Link> {/*insert link to one product*/}
// - for <img /> {/*inset image src of product*/}


const mapStateToProps = (state) => {
  // will need to check our state once connected to DB
  return {
    products: state.products.products
  }
}

// const mapDispatchToProps = (dispatch) => {
// }

export default connect(
  mapStateToProps
  )(Products)
