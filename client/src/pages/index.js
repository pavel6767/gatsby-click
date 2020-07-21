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
    let data = {}
    try {
      let res = await fetch('http://localhost:3001/api/inventory')
      // console.log(res)
      if (res.status === 200) {
        data = await res.json()
      }
      // console.log(data)
    } catch (error) {
      console.log(error)
    }
    this.setState({ products: data })
  }

  productMap() {
    const { products } = this.state

    return Object.keys(products).map(k => (
      <div key={k} id={k} className="productsItem">
        <img src={products[k].url} alt="sticker" />
        <div>${products[k].price / 100}</div>
        <button className="btn" onClick={this.props.addToCart}>{''} to cart</button>
      </div>))
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
