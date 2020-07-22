import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

function useForceUpdate() {
  const [value, setValue] = useState(false);
  return () => setValue(!value);
}

export default () => {
  const forceUpdate = useForceUpdate();
  const inCart = true
  const { sessionStorage } = window

  let totalPrice = Number(sessionStorage.getItem('totalPrice'))

  const cart = Object.keys(sessionStorage).map(key => {
    if (isNaN(sessionStorage.getItem(key))) {
      const item = JSON.parse(sessionStorage.getItem(key))
      return (
        <div key={key} id={key} className="productsItem">
          <img src={item.url} alt="sticker" />
          <div>${(item.price * item.quantity / 100)}</div>
          {inCart && <div>
            <button onClick={forceUpdate} className="btn-qty">-</button>
            {item.quantity}
            <button onClick={forceUpdate} className="btn-qty">+</button>
          </div>}
          <button className="btn" onClick={forceUpdate}>{inCart ? "Remove from " : "Add to "} cart</button>
        </div>
      )
    }
  })
  return (
    <Layout>
      <SEO title="cart" />
      <h1>Cart</h1>
      <div className="productsContainer">
        {cart}
      </div>
      <div className="total">Total: ${totalPrice / 100}</div>
    </Layout>
  )
}
