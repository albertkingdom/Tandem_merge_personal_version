import React, { useState, useEffect } from 'react'

// 設定一個state管理fetch儲存

function Mfriendlistcard() {
  const [myfriend, setMyFriend] = useState([])
  useEffect(() => {
    findmyfriend()
  }, [])
  const findmyfriend = () => {
    const getDatafromlocal = JSON.parse(localStorage.getItem('LoginUserData'))
    const input = { mbId: getDatafromlocal.mbId }
    async function Findfriendinfo(userId, callback) {
      const request = new Request(
        'http://localhost:6001/tandem/member/findfriendinfo',
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
      // console.log('RE fetch完成')
      const payload = await response.json()
      // console.log(payload)
      // 轉給state render畫面
      setMyFriend(payload)
    }
    //呼叫上方fetch送後端
    Findfriendinfo(input)
  }

  //解除好友功能

  const killmyfriend = e => {
    const killmbId = e.target.getAttribute('killmbid')
    // 測試使用return
    // return alert(killmbId)

    // 拿自己的id
    const getDatafromlocal = JSON.parse(localStorage.getItem('LoginUserData'))
    const mbId = getDatafromlocal.mbId
    const input = { mbId, killmbId }
    // 送fetch
    async function killmyfriendfetch(input, callback) {
      const request = new Request(
        'http://localhost:6001/tandem/member/killfriend',
        {
          method: 'POST',
          body: JSON.stringify(input),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      const response = await fetch(request)
      // console.log('RE fetch完成')
      const payload = await response.json()
      // console.log(payload)
      // 後端處理完後會再執行一次好友搜尋結果來render畫面
      setMyFriend(payload)
    }
    //呼叫上方fetch送後端
    killmyfriendfetch(input)
  }

  const myfriendlist = (
    <>
      {myfriend.map((val, idx) => {
        return (
          <>
            {/* <!-- 朋友列表小卡 始--> */}
            <div className="M-friendcollectCard" key={idx}>
              {/* <!-- 小卡左側 --> */}
              <div className="M-friendcollectCardleft">
                <div className="M-friendcollectPhoto">
                  <img src={val.mbAva} alt="" />
                </div>
                <button
                  type="button"
                  killmbid={val.mbId}
                  className="M-friendcollectClear"
                  onClick={e => {
                    killmyfriend(e)
                  }}
                >
                  解除好友
                </button>
              </div>
              {/* <!-- 小卡右側 --> */}
              <div className="M-friendcollectCardright">
                <h5>{val.mbNick}</h5>
                <p>{val.mbDes}</p>
                <div className="M-friendlistsate">
                  <div
                    className="M-friendcollectDot"
                    style={{ backgroundColor: `${val.mbOn ? 'green' : 'red'}` }}
                  ></div>
                  <span>{val.mbOn ? 'on' : 'off'}</span>
                </div>
              </div>
            </div>
            {/* <!-- 朋友列表小卡 終--> */}
          </>
        )
      })}
    </>
  )

  const nofriendlist = (
    <>
      <div className="M-friendcollectblock"></div>
    </>
  )

  return (
    <>
      <div className="M-friendcollectWrapper">
        {/* {myfriend.length ? myfriendlist : nofriendlist} */}

        {myfriend.length ? myfriendlist : nofriendlist}
      </div>
    </>
  )
}

export default Mfriendlistcard
