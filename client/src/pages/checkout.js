import React from "react"

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
    this.getCart = this.getCart.bind(this)
  }

  async handleSubmit(e) {
    e.preventDefault()

    let message, data, res
    const { userName, userEmail, cardType, cardNumber, cardCvv } = this.state

    let cart = this.getCart()

    try {
      let body = { userName, userEmail, cart, paymentInfo: { cardType, cardNumber, cardCvv } }
      console.log(body)
      res = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
        body: JSON.stringify(body)
      })
      if (res.status === 200) {
        data = await res.json()
        message = data.message
      } else {
        message = res.message
      }
    } catch (error) {
      message = error
    }


    // clear cart
    this.clearCart(cart)

    // clear state if request was successful
    let newState = res.status === 200 ? { ...this.initialState } : { ...this.state }

    this.setState({ ...newState, message }, (prevState) => {
      setTimeout(() => this.setState({ ...prevState, message: '' }), 2000)
    })
  }

  getCart() {
    const { sessionStorage } = window
    let cart = []

    Object.keys(sessionStorage).forEach(key => {
      if (!isNaN(Number(key))) {
        let item = JSON.parse(sessionStorage.getItem(key))
        cart.push({ ...item, id: key })
      }
    })
    return cart
  }

  clearCart(cart) {
    const { sessionStorage } = window
    cart.forEach(prod => {
      sessionStorage.removeItem(prod.id)
    })
    sessionStorage.removeItem('totalPrice')
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
    let totalPrice = Number(sessionStorage.getItem('totalPrice'))
    const { state } = this

    return (
      <Layout>
        <SEO title="Checkout" />
        <h1>checkout</h1>
        <div className="total">Total: ${totalPrice / 100}</div>
        <form className="checkout-form" onSubmit={this.handleSubmit}>
          <div>
            <input
              type='text'
              placeholder="Your Name"
              name="userName"
              onChange={this.handleChange}
              value={state.userName} required />
          </div>
          <div>
            <input
              type='email'
              placeholder="Your Email"
              name="userEmail"
              onChange={this.handleChange}
              value={state.userEmail} required />
          </div>
          <div>
            <select
              name="cardType"
              onChange={this.handleChange}
              value={state.cardType}
              required >
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
              required />
            <input
              type='text'
              maxLength="4"
              placeholder="cvv"
              name="cardCvv"
              onChange={this.handleChange}
              value={state.cardCvv}
              required />
          </div>
          <div>
            <button type='submit'>Order</button>
          </div>
        </form>
        {state.message !== "" && <div>
          <div>{state.message}</div>
        </div>}
      </Layout>
    )
  }
}
