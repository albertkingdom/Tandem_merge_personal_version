// 定義看商品細節動作的基本

const mygamedetailstate = {
  fetchgameinfo: {},
  opendetail: false,
}
// 取得點擊圖片id，改變fetch狀態，改變詳細卡顯示
const Mmygamedetail = (state = mygamedetailstate, action) => {
  switch (action.type) {
    case 'WATCH_GAME_DETAIL':
      return {
        ...state,
        fetchgameinfo: action.fetchgameinfo,
        opendetail: action.opendetail,
      }
    case 'CLOSE_GAME_DETAIL':
      return {
        ...state,
        fetchgameinfo: action.fetchgameinfo,
        opendetail: action.opendetail,
      }
    default:
      return state
  }
}

export default Mmygamedetail
