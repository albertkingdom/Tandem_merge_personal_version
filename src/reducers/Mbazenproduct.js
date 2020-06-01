const Mbazenproduct = (state = [], action) => {
  switch (action.type) {
    case 'USER_AZEN_PRODUCT':
      return action.myazenlist
    default:
      return state
  }
}

export default Mbazenproduct
