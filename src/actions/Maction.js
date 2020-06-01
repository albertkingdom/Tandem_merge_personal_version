// 會員首頁轉層
export const displayChange = displayLayer => {
  return {
    type: 'DISPLAY_CHANGE',
    layer: displayLayer,
  }
}

// 紙娃娃系統呼叫
export const dollCall = showargu => {
  return {
    type: 'CALL_DOLL',
    call: showargu,
  }
}

// 紀錄首頁user的登入狀態
export const mlogcontroll = logstate => {
  if (logstate) {
    return {
      type: 'GET_AUTH',
      UserAuth: true,
    }
  } else {
    return {
      type: 'GET_AUTH',
      UserAuth: false,
    }
  }
}

//由會員首頁拿到local的會員資料後

// 紀錄user會員中心使用資料
export const loaduserdata = userdatafromlocal => {
  return {
    type: 'LOCAL_USER_DATA',
    Userdata: userdatafromlocal,
  }
}

//呼叫收藏遊戲細節卡，並且把商品fetch結果，代入action使用
export const callmygamedetail = payload => {
  return {
    type: 'WATCH_GAME_DETAIL',
    fetchgameinfo: payload,
    opendetail: true,
  }
}
//關閉細節頁，清空redux
export const closemygamedetail = () => {
  return {
    type: 'CLOSE_GAME_DETAIL',
    fetchgameinfo: {},
    opendetail: false,
  }
}

//寄存會員azen商品資料
export const myazenproductlist = fetchData => {
  return {
    type: 'USER_AZEN_PRODUCT',
    myazenlist: fetchData,
  }
}

//保存加好友小卡資料

export const addfriendcard = clickdata => {
  return {
    type: 'ADD_FRIEND_DATA',
    addfrienddata: clickdata,
    openaddfriend: true,
  }
}

//保存好友申請人資料

export const confirmfriend = (fetchdata, fetchok) => {
  return {
    type: 'CONFIRM_FRIEND_DATA',
    comfirmfrienddata: fetchdata,
    addfriendsignal: fetchok,
  }
}

export const NameChange = newname => {
  return {
    type: 'NAME_CHANGE',
    name: newname,
  }
}

export const Callcard = callsignal => {
  return {
    type: 'CALL_LOG',
    callsignal: callsignal,
  }
}
