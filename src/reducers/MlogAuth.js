// 會員登錄狀態判定

const MlogAuth = (state = false, action) => {
  switch (action.type) {
    case 'GET_AUTH':
      return action.UserAuth
    default:
      return state
  }
}

export default MlogAuth
