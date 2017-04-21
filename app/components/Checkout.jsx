import React from 'react'
import Cart from './Cart'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { completeOrder } from '../reducers/order'

class Checkout extends React.Component {
    //  (props) => {

    // const handleSubmit = props.handleSubmit
    // // need to set this up^
    constructor(props) {
        super(props)
        this.state = {
            // add states
            name: '',
            streetAddress: '',
            city: '',
            state: '',
            zip: '',
            ccnType: '',
            ccnNum: '',
            expMonth: '',
            expYear: '',
            cvv: ''

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.totalPrice = this.totalPrice.bind(this)
    }



    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e ? e.preventDefault() : null;
        this.props.completeOrder(this.props.order)

    }

    totalPrice(items) {
        if (items) {
            return items.reduce((acc, item) => acc + item.price, 0)

        }
    }


    render() {
        return (
            <div>

                <h2>Order Details</h2>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.items && this.props.items.map((item) =>
                                <tr key={item.productId}>
                                    <td>{item.product.title}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.price}</td>
                                </tr>)
                            }
                            <tr>
                                <td></td>
                                <td>Total</td>
                                <td>{this.totalPrice(this.props.items)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Payment Details</legend>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Name</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Street Address</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="streetAddress"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">City</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="city"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">State</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="state"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Zip Code</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="zip"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Credit Card Type</label>
                            <div className="col-xs-10">
                                <select
                                    type="text"
                                    name="ccnType"
                                    onChange={this.handleChange}
                                >
                                    <option></option>
                                    <option>MasterCard</option>
                                    <option>Visa</option>
                                    <option>Amex</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Credit Card Number</label>
                            <div className="col-xs-10">
                                <input
                                    onChange={this.handleCCN}
                                    className="form-control"
                                    type="text"
                                    name="ccnNum"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Expiration Month</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="expMonth"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Expiration Year</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="expYear"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">CVV</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="cvv"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-10 col-xs-offset-2">
                                <button
                                    type="submit"
                                    className="btn btn-success">
                                    Submit Order
                            </button>
                            </div>
                        </div>
                    </fieldset>
                </form>

            </div>
        )
    }
}


const mapStateToProps = (state) => {

    return {
        order: state.order,
        items: state.order.items
    }
}
const mapDispatchToProps = { completeOrder }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
