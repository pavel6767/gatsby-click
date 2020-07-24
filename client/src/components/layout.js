/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import { myContext } from '../../Provider';

import "./layout.css"
import "./styles.css"

export default function Layout(props) {

  const { children } = props

  return (
    <myContext.Consumer>
      {context => (
        <>
          <Header />
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `0 1.0875rem 1.45rem`,
            }}
          >
            <main onClick={context.handleClick}>{children}</main>
            {/* <footer>
          Built by
          {` `}
          <a href="https://www.linkedin.com/in/pavel-machuca/">Pavel Machuca-Zavarzin</a>
        </footer> */}
          </div>
        </>
      )}
    </myContext.Consumer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
