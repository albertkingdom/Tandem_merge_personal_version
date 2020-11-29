import * as actionTypes from '../actions/SactionTypes'

//isUpdateFromLocal: 如果localStorage有cart，是否取得localStorage的資料
const initialState = { isUpdateFromLocal: false, count: 0, list: [] }

const cartCount = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.incrementCartCount:
      return {
        ...state,
        count: state.count + 1,
        list: [...state.list, action.payload],
      }
    case actionTypes.decrementCartCount:
      return {
        ...state,
        count: state.count - 1,
        list: state.list.filter(id => id !== action.payload),
      }
    case actionTypes.zeroCartCount:
      return initialState
    case actionTypes.getCartFromStorage:
      return {
        isUpdateFromLocal: true,
        count: action.payload.length,
        list: [...action.payload.list],
      }
    default:
      return state
  }
}

export default cartCount
