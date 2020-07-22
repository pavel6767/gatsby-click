/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import "./layout.css"
import "./styles.css"

export default class Layout extends React.Component {
  constructor(props) {
    super()
    this.state = {
      totalPrice: 0,
      cart: {}
    }
    this.addToCart = this.addToCart.bind(this)
  }

  addToCart(e) {
    if (e.target.className === 'btn') {
      // ref localstorage
      /*
        if in local storage remove
      */
      const { cart } = this.state
      const { id } = e.target.parentNode
      const { sessionStorage } = window

      const inCart = sessionStorage.getItem(id)

      if (inCart) {
        sessionStorage.removeItem(id)
        delete cart[id]
        this.setState({ ...this.state, cart })
      } else {
        sessionStorage.setItem(id, { price: 127, url: 'hi', quantity: 5 })
        this.setState({ ...this.state, cart: { ...cart, id: { price: 127, url: 'hi', quantity: 5 } } })
      }
    }
  }

  render() {
    const { children } = this.props
    return (
      <>
        <Header />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <main onClick={this.addToCart}>{children}</main>
          {/* <footer>
          Built by
          {` `}
          <a href="https://www.linkedin.com/in/pavel-machuca/">Pavel Machuca-Zavarzin</a>
        </footer> */}
        </div>
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
