// 換頁時登入卡彈跳

const Mcallogcard = (state = false, action) => {
  switch (action.type) {
    case 'CALL_LOG':
      return action.callsignal
    default:
      return state
  }
}

export default Mcallogcard
