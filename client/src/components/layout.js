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
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    if (!['btn', 'btn-qty'].includes(e.target.className)) return

    const { sessionStorage } = window
    let totalPrice = Number(sessionStorage.getItem('totalPrice'))
    if (!totalPrice) totalPrice = 0

    let id
    let item

    if (e.target.className === 'btn') {
      ({ id } = e.target.parentNode)
      item = JSON.parse(sessionStorage.getItem(id))

      if (item) {
        totalPrice -= item.price * item.quantity
        sessionStorage.removeItem(id)
      } else {
        let newItem = {
          price: 100 * Number(e.target.parentNode.children[1].textContent.slice(1)),
          url: e.target.parentNode.children[0].src,
          quantity: 1
        }

        totalPrice += newItem.price

        sessionStorage.setItem(id, JSON.stringify(newItem))
      }
      console.log('total price ', totalPrice)
    } else if (e.target.className === 'btn-qty') {
      ({ id } = e.target.parentNode.parentNode)
      item = JSON.parse(sessionStorage.getItem(id))

      if (e.target.textContent === "+") {
        item.quantity++
        totalPrice += item.price
      } else if (e.target.textContent === "-") {
        totalPrice -= item.price
        item.quantity--
      }

      if (item.quantity === 0) {
        sessionStorage.removeItem(id)
      } else {
        sessionStorage.setItem(id, JSON.stringify(item))
      }
    }
    sessionStorage.setItem('totalPrice', totalPrice)
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
          <main onClick={this.handleClick}>{children}</main>
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
