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
      cart: []
    }
  }

  async componentDidMount() {
    try {
      let res = await fetch('/api/inventory')
      console.log(res)
      let data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  render() {

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
          <main>{this.props.children}</main>
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
