import React, { useEffect, useState } from 'react'
import { GiSwordman } from 'react-icons/gi'

function MindexViewwall() {
  // 開啟後依據用戶id抓取資料
  useEffect(() => {
    pickupMygame()
  }, [])
  // 將資料設給state進行取用
  const [mygamearr, setMyMameArr] = useState([])
  const [imgarr, setImgarr] = useState([])

  // Fisher-Yates Shuffle亂序
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  // 沒資料時呈現畫面改變參數
  const [payloadok, setPayloadok] = useState(false)

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
      // console.log('RE fetch完成')
      const payload = await response.json()
      // console.log(payload)
      //TODO
      if (payload.length) {
        setMyMameArr([...payload])
        const collectimgarr = []
        // 由於state無法取到深層的值 直接轉換後只拿圖片string path
        for (let i = 0; i < payload.length; i++) {
          collectimgarr.push(payload[i].itemImg)
        }
        shuffle(collectimgarr)
        setImgarr(collectimgarr)
        setPayloadok(true)
      } else {
      }
    }
    //呼叫上方fetch送後端
    Findmygame(input)
  }

  const viewwalllist = (
    <>
      <div className="M-gameviewWall">
        {/* 圖片牆二分之一始 */}
        <div className="M-viewwallPart">
          {/* 圖片牆四分之一 始*/}
          <div className="M-vwpuzzleWrapper">
            <div className="M-vwbigPuzzle">
              <img src={`/images/shop/small_Img/${imgarr[0]}`} alt="" />
            </div>
            <div className="M-vwsmlPuzzleWrapper">
              <div className="M-vwsmlPuzzleLeft">
                <img src={`/images/shop/small_Img/${imgarr[1]}`} alt="" />
              </div>
              <div className="M-vwsmlPuzzleRight">
                <img src={`/images/shop/small_Img/${imgarr[2]}`} alt="" />
              </div>
            </div>
          </div>
          {/* 圖片牆四分之一 終*/}
          {/* 圖片牆四分之一 始*/}
          <div className="M-vwpuzzleWrapper">
            <div className="M-vwsmlPuzzleWrapper">
              <div className="M-vwsmlPuzzleLeft">
                <img src={`/images/shop/small_Img/${imgarr[3]}`} alt="" />
              </div>
              <div className="M-vwsmlPuzzleRight">
                <img src={`/images/shop/small_Img/${imgarr[4]}`} alt="" />
              </div>
            </div>
            <div className="M-vwbigPuzzle">
              <img src={`/images/shop/small_Img/${imgarr[5]}`} alt="" />
            </div>
          </div>
          {/* 圖片牆四分之一 終*/}
        </div>
        {/* -----------------第二面-------------------- */}
        {/* 圖片牆二分之一始 */}
        <div className="M-viewwallPart">
          {/* 圖片牆四分之一 始*/}
          <div className="M-vwpuzzleWrapper">
            <div className="M-vwbigPuzzle">
              <img src={`/images/shop/small_Img/${imgarr[6]}`} alt="" />
            </div>
            <div className="M-vwsmlPuzzleWrapper">
              <div className="M-vwsmlPuzzleLeft">
                <img src={`/images/shop/small_Img/${imgarr[7]}`} alt="" />
              </div>
              <div className="M-vwsmlPuzzleRight">
                <img src={`/images/shop/small_Img/${imgarr[8]}`} alt="" />
              </div>
            </div>
          </div>
          {/* 圖片牆四分之一 終*/}
          {/* 圖片牆四分之一 始*/}
          <div className="M-vwpuzzleWrapper">
            <div className="M-vwsmlPuzzleWrapper">
              <div className="M-vwsmlPuzzleLeft">
                <img src={`/images/shop/small_Img/${imgarr[9]}`} alt="" />
              </div>
              <div className="M-vwsmlPuzzleRight">
                <img src={`/images/shop/small_Img/${imgarr[10]}`} alt="" />
              </div>
            </div>
            <div className="M-vwbigPuzzle">
              <img src={`/images/shop/small_Img/${imgarr[11]}`} alt="" />
            </div>
          </div>
          {/* 圖片牆四分之一 終*/}
        </div>
      </div>
    </>
  )

  const blockwall = (
    <>
      <div className="M-vwblockWrapper">
        <h2>去尋找屬於你的遊戲吧!</h2>
        <div className="M-vwblockmarker">
          <GiSwordman />
        </div>
      </div>
    </>
  )
  const blockwall2 = (
    <>
      <div className="M-vwblockWrapper"></div>
    </>
  )

  // <>{payloadok ? viewwalllist : blockwall}</>

  return <>{payloadok ? viewwalllist : viewwalllist}</>
}

export default MindexViewwall
