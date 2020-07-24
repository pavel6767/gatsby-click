# Take Home assignment
## Tools used
- Node
- Express
- React
- Gatsby

## Frontend
- User
  - sees list of products
  - can add products to a cart
  - can edit cart
  - can checkout with valid email and payment card

## Backend
- **:GET** /inventory
  - Displays list of available products
  - ```
    {productId: {
      price: number,
      url: url
    }}
- **:POST** /checkout
  - validates all req.body keys
  - ```
    {
      userName: string,
      userEmail: email,
      cart: [{
        id: productId,
        quantity: number}],
      paymentInfo: {
        cardType: ['visa', 'amex', 'mastercard'],
        cardNumber: string,
        cardCvv: string
      } }
