import * as actionTypes from '../actions/SactionTypes'

const initialstate = { isGetDataFromStorage: false, list: [] }

const userAzenProductList = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.getAzenListfromStorage:
      return {
        isGetDataFromStorage: true,
        list: [...state.list, ...action.payload.idList],
      }
    case actionTypes.addAzenId:
      return {
        ...state,
        list: [...state.list, action.payload.newId.toString()],
      }
    case actionTypes.removeAzenId:
      return {
        ...state,
        list: state.list.filter(id => id !== action.payload.oldId.toString()),
      }
    default:
      return state
  }
}
export default userAzenProductList
