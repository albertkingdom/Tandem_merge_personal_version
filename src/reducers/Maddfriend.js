const initFriendData = {
  openaddfriend: false,
  addfreindData: {},
}

const Maddfriend = (state = initFriendData, action) => {
  switch (action.type) {
    case 'ADD_FRIEND_DATA':
      return {
        ...state,
        openaddfriend: action.openaddfriend,
        addfreindData: action.addfrienddata,
      }
    default:
      return state
  }
}

export default Maddfriend
