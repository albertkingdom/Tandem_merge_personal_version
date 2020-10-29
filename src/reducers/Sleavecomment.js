import { combineReducers } from 'redux'

//第一步：建立reducer
//action = {type, value}
//type: ADD_VALUE, MINUS_VALUE
//ex. action = {type: 'ADD_VALUE, value: 10}
const user = (state = { isAuth: false }, action) => {
  switch (action.type) {
    case 'USER_REGISTER':
      return { ...action.data, isAuth: true }
    case 'USER_LOGIN':
      return { ...action.data, isAuth: true }
    case 'USER_LOGOUT':
      return { isAuth: false }
    default:
      return state
  }
}
const Sleavecomment = (state = { messageIsLeft: false }, action) => {
  switch (action.type) {
    case 'LEAVE_MESSAGE':
      return { messageIsLeft: true }
    default:
      return state
  }
}

//合併多個reducer(必要，為了要配合瀏覽器開發外掛使用)
// const rootReducer = combineReducers({
//   user,
//   SleaveComment,
// })

export default Sleavecomment
