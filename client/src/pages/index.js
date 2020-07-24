import React from "react"

import { myContext } from '../../Provider';
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

  productMap({ cart, totalPrice }) {
    const { products } = this.state

    return Object.keys(products).map(key => {
      const inCart = cart[key]

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
        <myContext.Consumer>
          {context => (
            <>
              <SEO title="Home" />
              <h1>Home</h1>
              <div className="productsContainer">
                {this.productMap(context)}
              </div>
            </>
          )}
        </myContext.Consumer>
      </Layout>
    )
  }
}
