import * as actionTypes from './SactionTypes'

export const addCoupon = discount => {
  return { type: actionTypes.addCoupon, payload: { discount: discount } }
}

export const removeCoupon = discount => {
  return { type: actionTypes.removeCoupon }
}
