const cartCounter = (state = 0, action) => {
  switch (action.type) {
    case 'CART_INCREMENT':
      return {
        cartnumbers: state + 1,
      }
    default:
      return state
  }
}
export default cartCounter
