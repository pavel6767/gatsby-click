import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const links = [
  {
    title: "Home",
    slug: "/"
  },
  {
    title: "Cart",
    slug: "/cart"
  },
  {
    title: "Checkout",
    slug: "/checkout"
  },
]

const Header = () => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <ul className="navButtons">
        {links.map(link => (
          <Link
            key={link.slug}
            to={link.slug}>
            {link.title}
          </Link>))}
      </ul>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
