import React, { useState } from 'react';

export const myContext = React.createContext();

const Provider = props => {
  const [cart, updateCart] = useState({});
  const [totalPrice, updateTotalPrice] = useState(0);

  function _handleClick(e) {
    if (!['btn', 'btn-qty'].includes(e.target.className)) return

    let id, item, newPrice = totalPrice, newCart = cart

    if (e.target.className === 'btn') {
      ({ id } = e.target.parentNode)

      if (cart.hasOwnProperty(id)) {
        // if item is in cart, remove it from cart and totalPrice
        item = cart[id]
        newPrice -= item.price * item.quantity
        delete newCart[id]
      } else {
        // add item to cart with qty 1 and update price
        let newItem = {
          price: 100 * Number(e.target.parentNode.children[1].textContent.slice(1)),
          url: e.target.parentNode.children[0].src,
          quantity: 1
        }

        newPrice += newItem.price
        newCart[id] = newItem
      }
    } else if (e.target.className === 'btn-qty') {
      // if clicked +/-
      ({ id } = e.target.parentNode.parentNode)
      item = newCart[id]

      if (e.target.textContent === "+") {
        item.quantity++
        newPrice += item.price
      } else if (e.target.textContent === "-") {
        newPrice -= item.price
        item.quantity--
      }

      if (item.quantity === 0) {
        delete newCart[id]
      } else {
        updateCart(newCart)
      }
    }
    updateTotalPrice(newPrice)
  }

  function clearCart() {
    updateTotalPrice(0)
    updateCart({})
    console.log('cart clearer')
    console.log('cart', cart)
    console.log('price ', totalPrice)
  }

  return (
    <myContext.Provider value={{
      cart, totalPrice,
      handleClick: (e) => _handleClick(e),
      clearCart
    }}>
      {props.children}
    </myContext.Provider>
  )
};

export default ({ element }) => (
  <Provider>
    {element}
  </Provider>
);
