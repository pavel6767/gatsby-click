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
    const { sessionStorage } = window

    return Object.keys(products).map(key => {
      const inCart = JSON.parse(sessionStorage.getItem(key))
      return (
        <div key={key} id={key} className="productsItem">
          <img src={products[key].url} alt="sticker" />
          <div>${products[key].price / 100}</div>
          {inCart && <div>
            <button onClick={() => this.forceUpdate()} className="btn-qty">-</button>
            {inCart.quantity}
            <button onClick={() => this.forceUpdate()} className="btn-qty">+</button>
          </div>}
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
