import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { createItem } from '../reducers/order'
import { createReview } from '../reducers/product'

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedQty: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.addSubmit = this.addSubmit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    const product = this.props.product
    const qty = product.invQty
    const reviews= this.props.product.reviews || []
    return (
      <div className="product">
        <div className="product-box">
          <h2> {product.title} </h2>
          <img id="productImage" src={product.image} />
            <div>
              <span className="price">${product.price}</span>
            </div>
        </div>
        <div className="col-md-6">
          <h3>Description: </h3>
            <p>{product.description}</p>
          <label> Quantity: </label>
          <select onChange={this.handleChange}>
            <option> </option>
            {generateOptions(qty)}
          </select>
          <div>
            <button type='submit' className='btn btn-success' onClick={this.addSubmit}> Add To Cart </button>
          </div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th> User Name </th>
              <th> Rating </th>
              <th> Review Details</th>
            </tr>
            </thead>
            <tbody>
              {reviews && reviews.map(
                review => <tr key={review.id}>
                  <td> {review.user.name} </td>
                  <td> {review.starRating} </td>
                  <td> {review.text} </td>
                  </tr>
              ) }
            </tbody>
        </table>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
           <fieldset>
              <legend>Write a Review!</legend>
                <div className="form-group">
                  <label className="col-xs-2 control-label">Star Rating</label>
                  <div className="col-xs-10">
                    <select
                        type="text"
                        name="starRating">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                  </div>
              </div>
              <div className="form-group">
                  <label className="col-xs-2 control-label">Review Text</label>
                  <div className="col-xs-10">
                      <input
                          className="form-control"
                          type="text"
                          name="reviewText"
                      />
                  </div>
              </div>
                <div className="form-group">
                  <div className="col-xs-10 col-xs-offset-2">
                          <button type="submit" className="btn btn-success">Submit Review</button>
                  </div>
                </div>
            </fieldset>
        </form>
      </div>
    )
  }

  handleChange(evt) {
    this.setState({
      selectedQty: evt.target.value
    })
  }

  addSubmit(evt) {
    evt.preventDefault()
    const qty = this.state.selectedQty
    const product = this.props.product
    const itemToAdd = {
      product_id: product.id,
      price: product.price,
      qty: qty,
      order_id: this.props.order.id
    }
    this.props.createItem(itemToAdd)
    browserHistory.push('/cart')
  }

  handleSubmit(evt){
    evt.preventDefault()
    const reviewText = evt.target.reviewText.value
    const productId = this.props.product.id
    if(reviewText.length > 10){
      const review = {
        starRating: evt.target.starRating.value,
        text: reviewText,
        product_id: productId
      }
      this.props.createReview(review, productId)
      evt.target.reviewText.value = ""
      evt.target.starRating.value = 1
    }
    else alert('Your review must be longer than 10 characters')

  }
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


const mapStateToProps = ({product, order}) => ({product, order})

const mapDispatchToProps = { createItem, createReview }

export default connect(
  mapStateToProps, mapDispatchToProps
)(Product)
