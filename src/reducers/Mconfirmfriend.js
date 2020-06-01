const initData = {
  invitefreindData: {},
  //   預設加好友是關閉的，當有資料進來才打開
  addfriendsignal: false,
}

const Mconfirmfriend = (state = initData, action) => {
  switch (action.type) {
    case 'CONFIRM_FRIEND_DATA':
      return {
        ...state,
        invitefreindData: action.comfirmfrienddata,
        addfriendsignal: action.addfriendsignal,
      }
    default:
      return state
  }
}

export default Mconfirmfriend
