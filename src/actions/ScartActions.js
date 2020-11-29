import * as actionTypes from './SactionTypes'

export const increaseCartCount = id => (dispatch, state) => {
  // console.log(state().Scart)
  let currentCartList = state().Scart.list

  if (currentCartList.indexOf(id) === -1) {
    // console.log('not in the list')
    dispatch({ type: actionTypes.incrementCartCount, payload: id })
  }
}
//將購物車計數器歸零
export const zeroCartCount = () => {
  return { type: actionTypes.zeroCartCount }
}

export const getCartCountFromStorage = () => {
  let localCart = JSON.parse(localStorage.getItem('cart'))
  return {
    type: actionTypes.getCartFromStorage,
    payload: { length: localCart.length, list: localCart.map(item => item.id) },
  }
}
