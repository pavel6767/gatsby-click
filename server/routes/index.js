const router = require('express').Router()
module.exports = router

const inventory = require("../src.json")

router.get('/inventory', async (req, res, next) => {
  try {
    res.send(inventory)
  } catch (err) {
    next(err);
  }
})


router.post('/checkout', async (req, res, next) => {
  try {
    const { userName, userEmail, cart, paymentInfo } = req.body

    let response = {}
    let message = ''

    // check for valid email
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test(String(userEmail).toLowerCase())) throw new Error('invalid email');

    // check for valid payment info
    const cards = {
      visa: new RegExp("^4[0-9]{12}(?:[0-9]{3})?$"),
      amex: new RegExp("^3[47][0-9]{13}$"),
      mastercard: new RegExp("^5[1-5][0-9]{14}$")
    }

    if (!cards.hasOwnProperty([paymentInfo.cardType])) {
      message = 'invalid card type'
      throw new Error(message)
    }

    if (!cards[paymentInfo.cardType].test(String(paymentInfo.cardNumber))) {
      message = `invalid ${paymentInfo.cardType} card`
      throw new Error(message)
    }

    // check for all products to exist in inventory
    let totalPrice = 0
    cart.forEach((product, i) => {
      if (!inventory.hasOwnProperty(product.id)) {
        message = `product id ${product.id} does not exist`
        throw new Error(message);
      }
      cart[i] = { ...product, url: inventory[product.id].url, price: inventory[product.id].price }
      totalPrice += inventory[product.id].price * product.quantity
    })

    message = "Success! Thank you for your purchase";
    response = { cart, userName, userEmail, paymentInfo, totalPrice, message };
    console.log('\n\n\nsuccess')
    res.send(response)
  } catch (err) {
    err.status = 403
    // res.status(403).send({ message: err.message })
    next(err);
  }
})
