import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default class HomePage extends React.Component {
  constructor(props) {
    super()
    this.state = {
      products: {}
    }
  }

  async componentDidMount() {
    let products = {}
    try {
      let res = await fetch('http://localhost:3001/api/inventory')
      if (res.status === 200) {
        products = await res.json()
      }
    } catch (error) {
      console.log(error)
    }
    this.setState({ products })
  }

  productMap() {
    const { products } = this.state
    /*
      button ref localstore

      div for qty ref localstore
    */
    const { sessionStorage } = window
    return Object.keys(products).map(k => {
      const inCart = sessionStorage.getItem(k)

      return (
        <div key={k} id={k} className="productsItem">
          <img src={products[k].url} alt="sticker" />
          <div>${products[k].price / 100}</div>
          {inCart && <div>{inCart.quantity}</div>}
          <button className="btn" onClick={() => this.forceUpdate()}>{inCart ? "Remove from " : "Add to "} cart</button>
        </div>)
    })
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <h1>Home</h1>
        <div className="productsContainer">
          {this.productMap()}
        </div>
      </Layout>
    )
  }
}
