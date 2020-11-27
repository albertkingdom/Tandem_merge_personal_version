const initialstate = { isGetDataFromStorage: false, list: [] }
const userAzenProductList = (state = initialstate, action) => {
  switch (action.type) {
    case 'ADD_FROM_STORAGE':
      return {
        isGetDataFromStorage: true,
        list: [...state.list, ...action.payload.idList],
      }
    case 'ADD':
      return {
        ...state,
        list: [...state.list, action.payload.newId.toString()],
      }
    case 'REMOVE':
      return {
        ...state,
        list: state.list.filter(id => id !== action.payload.oldId.toString()),
      }
    default:
      return state
  }
}
export default userAzenProductList
