import React, { useState } from "react"

import { myContext } from '../../Provider';
import Layout from "../components/layout"
import SEO from "../components/seo"

function useForceUpdate() {
  const [value, setValue] = useState(false);
  return () => setValue(!value);
}

export default () => {
  const forceUpdate = useForceUpdate();
  const inCart = true

  const displayCart = ({ cart }) => Object.keys(cart).map(key => {
    const item = cart[key]
    return (
      <div key={key} id={key} className="productsItem">
        <img src={item.url} alt="sticker" />
        <div>${(item.price * item.quantity / 100)}</div>
        <div>
          <button onClick={forceUpdate} className="btn-qty">-</button>
          {item.quantity}
          <button onClick={forceUpdate} className="btn-qty">+</button>
        </div>
        <button className="btn" onClick={forceUpdate}>{inCart ? "Remove from " : "Add to "} cart</button>
      </div>
    )
  })
  return (
    <Layout>
      <myContext.Consumer>
        {context => (
          <>
            <SEO title="cart" />
            <h1>Cart</h1>
            <div className="productsContainer">
              {displayCart(context)}
            </div>
            <div className="total">Total: ${context.totalPrice / 100}</div>
          </>
        )}
      </myContext.Consumer>
    </Layout>
  )
}
