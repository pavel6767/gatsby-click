import React from "react"

import { myContext } from '../../Provider';
import Layout from "../components/layout"
import SEO from "../components/seo"

export default class Checkout extends React.Component {
  constructor() {
    super()
    this.initialState = {
      userName: '',
      userEmail: '',
      cardType: '',
      cardNumber: '',
      cardCvv: '',
      message: ''
    }
    this.state = {
      ...this.initialState
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(e, context) {
    e.preventDefault()

    let message, data, res, valid = true
    const { userName, userEmail, cardType, cardNumber, cardCvv } = this.state

    // convert cart into array
    let cart = []
    Object.keys(context.cart).forEach(id => {
      let item = context.cart[id]
      cart.push({ ...item, id })
    })

    try {
      let body = { userName, userEmail, cart, paymentInfo: { cardType, cardNumber, cardCvv } }
      console.log('body', body)
      res = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
        body: JSON.stringify(body)
      })

      data = await res.json()
      message = data.message

      valid = res.status === 200

    } catch (error) {
      console.log(error)
    }

    // clear cart and state if request was successful
    let newState
    // if (valid) {
    //   newState = { ...this.initialState }
    //   context.clearCart()
    // } else {
    //   newState = { ...this.state }
    // }
    newState = { ...this.state }

    this.setState({ ...newState, message }, (prevState) => {
      setTimeout(() => this.setState({ ...prevState, message: '' }), 2000)
    })
  }

  handleChange(e) {
    if (e.target.name === "cardNumber" || e.target.name === "cardCvv") {
      if (isNaN(e.target.value)) return null
    }

    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { state } = this
    return (
      <Layout>
        <myContext.Consumer>
          {context => (
            <>
              <SEO title="Checkout" />
              <h1>checkout</h1>
              <div className="total">Total: ${context.totalPrice / 100}</div>
              <form className="checkout-form" onSubmit={(e) => this.handleSubmit(e, context)}>
                <div>
                  <input
                    type='text'
                    placeholder="Your Name"
                    name="userName"
                    onChange={this.handleChange}
                    value={state.userName}
                  // required
                  />
                </div>
                <div>
                  <input
                    type='email'
                    placeholder="Your Email"
                    name="userEmail"
                    onChange={this.handleChange}
                    value={state.userEmail}
                  // required
                  />
                </div>
                <div>
                  <select
                    name="cardType"
                    onChange={this.handleChange}
                    value={state.cardType}
                  // required
                  >
                    <option disabled selected value=""> -- select an option -- </option>
                    <option value="visa">Visa</option>
                    <option value="amex">Amex</option>
                    <option value="mastercard">Mastercard</option>
                  </select>
                </div>
                <div>
                  <input
                    type='text'
                    maxLength="19"
                    placeholder="card number"
                    name="cardNumber"
                    onChange={this.handleChange}
                    value={state.cardNumber}
                  // required
                  />
                  <input
                    type='text'
                    maxLength="4"
                    placeholder="cvv"
                    name="cardCvv"
                    onChange={this.handleChange}
                    value={state.cardCvv}
                  // required
                  />
                </div>
                <div>
                  <button type='submit'>Order</button>
                </div>
              </form>
              {state.message !== "" && <div>
                <div>{state.message}</div>
              </div>}

            </>
          )}
        </myContext.Consumer>
      </Layout>
    )
  }
}
