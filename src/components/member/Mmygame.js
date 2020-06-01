import React, { useState, useEffect } from 'react'

// 為了控制細節頁呈現引入redux
import { useDispatch } from 'react-redux'
import { callmygamedetail } from '../../actions/Maction'
// 收藏遊戲細節頁
import McollectgameDetail from '../../components/member/McollectgameDetail'

function Mmygame() {
  const [mygamelist, setMygameList] = useState([])
  useEffect(() => {
    pickupMygame()
  }, [])
  const pickupMygame = () => {
    const getDatafromlocal = JSON.parse(localStorage.getItem('LoginUserData'))
    const input = { mbId: getDatafromlocal.mbId }
    async function Findmygame(userId, callback) {
      const request = new Request(
        'http://localhost:6001/tandem/member/findmygame',
        {
          method: 'POST',
          body: JSON.stringify(userId),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      const response = await fetch(request)
      // console.log('mygame fetch完成')
      const payload = await response.json()
      // console.log(payload)
      //TODO
      if (payload) {
        setMygameList(payload)
      }
    }
    //呼叫上方fetch送後端
    Findmygame(input)
  }

  const mygamefinallist = (
    <>
      {/* --------------------感應區要重新設計-------- */}
      {mygamelist.map((val, idx) => {
        return (
          <>
            <div className="M-mygameListcard" key={idx}>
              <div className="M-mygameImgwrapper">
                <img
                  src={`/images/shop/small_Img/${val.itemImg}`}
                  itemID={val.itemId}
                  onClick={e => {
                    getgameDetail(e)
                    setShadowOn(true)
                  }}
                  alt=""
                />
              </div>
              <div
                className="M-mygameUplayer"
                //這樣可以拿到自定義的id，之後用來搜商品資料，設定詳細卡的state
              >
                <h5>{val.itemName}</h5>
                <div className="M-mygameUnderline"></div>
              </div>
            </div>
          </>
        )
      })}
    </>
  )
  const dispatch = useDispatch()
  //處理點擊後更新細節卡內容
  const getgameDetail = e => {
    const input = { itemId: e.target.getAttribute('itemID') }
    async function Findfriendinfo(itemId, callback) {
      const request = new Request(
        'http://localhost:6001/tandem/member/findmygamedetail',
        {
          method: 'POST',
          body: JSON.stringify(itemId),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      const response = await fetch(request)
      // console.log('RE fetch完成')
      const payload = await response.json()
      //把fetch結果轉給reduxstate，讓詳細頁可以拿到
      // console.log(payload)

      // 整理時間格式
      payload.map((val, idx) => {
        val.itemDate = val.itemDate.split('T')[0]
      })

      if (payload) {
        dispatch(callmygamedetail(payload[0]))
      }
      //TODO
    }
    //呼叫上方fetch送後端
    Findfriendinfo(input)
  }
  // 背景黑幕state
  const [shadowon, setShadowOn] = useState(false)

  return (
    <>
      {/* list最外層 */}
      <div className="M-mygameListWrapper">
        <McollectgameDetail
          cancelbg={() => {
            setShadowOn(false)
          }}
        />
        {mygamefinallist}
        <div
          className="M-mygameListshadowbg"
          style={{ display: `${shadowon ? '' : 'none'}` }}
        ></div>
        {/* 個別遊戲小卡 */}
        {/* <div className="M-mygameListcard">
          <img src="/images/member/mygameSample.jpg" alt="" />
          <div
            imgid="ok"
            className="M-mygameUplayer"
            //這樣可以拿到自定義的id，之後用來搜商品資料，設定詳細卡的state
            onClick={e => {
              console.log(e.target.getAttribute('imgId'))
            }}
          >
            <h5>血緣詛咒666666666666667777744</h5>
            <div className="M-mygameUnderline"></div>
          </div>
        </div>
        <div className="M-mygameListcard"></div>
        <div className="M-mygameListcard"></div>
        <div className="M-mygameListcard"></div>
        <div className="M-mygameListcard"></div> */}
      </div>
    </>
  )
}

export default Mmygame
