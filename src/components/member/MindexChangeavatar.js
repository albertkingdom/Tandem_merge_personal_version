import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//取得修改UserAvata的action
import { loaduserdata } from '../../actions/Maction'
// 引用的icon
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineCloseCircle,
} from 'react-icons/ai'

//送控制dollcall action
import { dollCall } from '../../actions/Maction'

function MindexChangeavatar() {
  const calldoll = useSelector(state => state.Mdollcalling)
  const UserData = useSelector(state => state.MbcenterUserDate)
  const dispatch = useDispatch()

  // 拿到canvas
  const canvasRef = React.useRef(null)

  // 定義兩個圖片物件
  const img = new Image()
  const img2 = new Image()
  //取UserlocalData
  const AvataUseData = useSelector(state => state.MbcenterUserDate)

  // 輸送帶位置參數
  const [headlistpos, setHeadlistpos] = useState(0)
  const [bodylistpos, setBodylistpos] = useState(0)
  let headinital = 0
  // 上限修正-22
  const moveHead = movedis => {
    headinital = headlistpos
    if (headinital > -5) {
      headinital = -5
    }
    if (headinital < -22) {
      headinital = -22
    }
    headinital += movedis
    setHeadlistpos(headinital)
  }
  let bodyinital = 0
  const moveBody = movedis => {
    bodyinital = bodylistpos
    if (bodyinital > -5) {
      bodyinital = -5
    }
    if (bodyinital < -22) {
      bodyinital = -22
    }
    bodyinital += movedis
    setBodylistpos(bodyinital)
  }

  // 圖片路徑參數
  const [headimg, setHeadImg] = useState('')
  const [bodyimg, setBodyImg] = useState('')
  // component載入時要加入使用者紀錄的圖片路徑

  const getOrisetting = () => {
    // console.log(AvataUseData.mbAvaBody)
    setBodyImg(AvataUseData.mbAvaBody)
    setHeadImg(AvataUseData.mbAvaHead)
  }

  // 利用calldoll觸發取值，不然useeffect會跑在最前面拿不到local值
  useEffect(() => {
    getOrisetting()
  }, [calldoll])
  //圖片任何參數更動都要再畫一次
  // 動頭
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    img.src = bodyimg
    ctx.drawImage(img, 40, 90, 140, 140)
    img2.src = headimg
    ctx.drawImage(img2, 65, 0, 98, 120)
  }, [headimg])
  // 動下半
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    img.src = bodyimg
    ctx.drawImage(img, 40, 90, 140, 140)
    img2.src = headimg
    ctx.drawImage(img2, 65, 0, 98, 120)
  }, [bodyimg])

  // 點擊分別注入兩種state 用effect處理
  const getHead = e => {
    const orisrc = e.target.src
    const digestsrc = orisrc.split(':3000')[1]
    // console.log(digestsrc)
    setHeadImg(digestsrc)
  }
  const getBody = e => {
    const orisrc = e.target.src
    const digestsrc = orisrc.split(':3000')[1]
    setBodyImg(digestsrc)
  }

  //紀錄使用者最終的canvas狀態 //應該要寫給redux，讓所有用到的state的component改變
  // 在Dimount的時候會從資料庫fetch值出來
  const [finalcanvas, setFinalCanvas] = useState()

  const getCanvas = () => {
    // 取得最新的canvas結果
    let finalcanvasbase64 = canvasRef.current.toDataURL()
    console.log(finalcanvasbase64)
    // 包成一個obj送後端//必須取得userID or mail，也要寫入頭和身體最後選擇的路徑---------
    const usercanvasobj = {
      mbId: AvataUseData.mbId,
      userNewcanvas: finalcanvasbase64,
      mbNewAvaHead: headimg,
      mbNewAvaBody: bodyimg,
    }
    // 發一個fetch修改後端資料
    async function updatecanvas(userupdatedcanvas, callback) {
      const request = new Request(
        'http://localhost:6001/tandem/member/changeavatar',
        {
          method: 'POST',
          body: JSON.stringify(userupdatedcanvas),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      const response = await fetch(request)
      // console.log('fetch完成')
      const payload = await response.json()
      // console.log(payload)

      if (payload.success) {
        // 先拿到目前的redux物件 //  進行redux的修改
        const updateReduxuser = {
          ...UserData,
          mbAva: payload.body.userNewcanvas,
          mbAvaHead: payload.body.mbNewAvaHead,
          mbAvaBody: payload.body.mbNewAvaBody,
        }
        // console.log('upduateCanvasUserData' + JSON.stringify(updateReduxuser))
        dispatch(loaduserdata(updateReduxuser))
        dispatch(dollCall(false))
      }

      // 必須讓會員首頁再重新loading

      //TODO 取得base64轉給state//應該要改寫成dispatch action
      // setFinalCanvas(finalcanvasbase64)
      //TODO
      // 送後端結束後應該要把新資料回收再分別設定給local以及reduxstate
      // 取得local
      // 整理到此段
      // ----------------------------------
      // const orilocalStorage = localStorage.getItem('LoginUserData')
      // console.log(orilocalStorage)
      // //加工
      // const modifiedobj = {
      //   ...orilocalStorage,
      //   mbAva: payload.userNewcanvas,
      //   mbAvaHead: payload.mbNewAvaHead,
      //   // mbAvaBody: payload.mbNewAvaBody,
      //   mbAvaBody: '測試',
      // }
      // localStorage.setItem('LoginUserData', modifiedobj)
    }
    //呼叫上方fetch送後端
    updatecanvas(usercanvasobj)
  }

  return (
    <>
      <div
        className="M-dollMoveWrapper"
        style={{ top: `${calldoll ? '' : '-50rem'}` }}
      >
        <div className="M-dollcardWrapper">
          <div
            className="M-dollcancelBtn"
            onClick={() => {
              dispatch(dollCall(false))
            }}
          >
            <AiOutlineCloseCircle />
          </div>

          {/* 主要頭像 canvas*/}
          <div className="M-dollcardMajor">
            <canvas ref={canvasRef} width={230} height={230} />
          </div>
          {/* 頭部選擇區 */}
          <div className="M-dollhControlgroup">
            {/* 選擇控制表按鈕 */}
            {/* 頭部控制左 */}
            <div
              className="M-dollhSelect"
              onClick={() => {
                moveHead(5)
              }}
            >
              <AiOutlineLeft />
            </div>

            <h5>頭部選擇</h5>
            {/* 頭部控制右 */}

            <div
              className="M-dollhSelect"
              onClick={() => {
                moveHead(-5)
              }}
            >
              <AiOutlineRight />
            </div>
          </div>
          {/* 頭部選擇表最外框 */}
          <div className="M-dollhimgOuter">
            {/* 頭部圖片乘載器 */}
            <ul
              className="M-dollhimgList"
              style={{ left: headlistpos + 'rem' }}
            >
              <li>
                <img
                  src="/images/member/dollsystemImg/head1.png"
                  alt=""
                  onClick={e => getHead(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/head2.png"
                  alt=""
                  onClick={e => getHead(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/head3.png"
                  alt=""
                  onClick={e => getHead(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/head4.png"
                  alt=""
                  onClick={e => getHead(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/head5.png"
                  alt=""
                  onClick={e => {
                    getHead(e)
                  }}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/head6.png"
                  alt=""
                  onClick={e => {
                    getHead(e)
                  }}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/head7.png"
                  alt=""
                  onClick={e => {
                    getHead(e)
                  }}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/head8.png"
                  alt=""
                  onClick={e => {
                    getHead(e)
                  }}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/head9.png"
                  alt=""
                  onClick={e => {
                    getHead(e)
                  }}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/head10.png"
                  alt=""
                  onClick={e => {
                    getHead(e)
                  }}
                />
              </li>
            </ul>
          </div>
          {/* 身體選擇器 */}
          <div className="M-dollhControlgroup">
            {/* 選擇控制表按鈕 */}
            <div
              className="M-dollhSelect"
              onClick={() => {
                moveBody(5)
              }}
            >
              <AiOutlineLeft />
            </div>

            <h5>下半選擇</h5>
            <div
              className="M-dollhSelect"
              onClick={() => {
                moveBody(-5)
              }}
            >
              <AiOutlineRight />
            </div>
          </div>
          {/* 下半選擇表最外框和頭共用 */}
          <div className="M-dollhimgOuter">
            {/* 下半圖片乘載器 */}
            <ul
              className="M-dollbimgList"
              style={{ left: bodylistpos + 'rem' }}
            >
              <li>
                <img
                  src="/images/member/dollsystemImg/body1.png"
                  alt=""
                  onClick={e => getBody(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/body2.png"
                  alt=""
                  onClick={e => getBody(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/body3.png"
                  alt=""
                  onClick={e => getBody(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/body4.png"
                  alt=""
                  onClick={e => getBody(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/body5.png"
                  alt=""
                  onClick={e => getBody(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/body6.png"
                  alt=""
                  onClick={e => getBody(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/body7.png"
                  alt=""
                  onClick={e => getBody(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/body8.png"
                  alt=""
                  onClick={e => getBody(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/body9.png"
                  alt=""
                  onClick={e => getBody(e)}
                />
              </li>
              <li>
                <img
                  src="/images/member/dollsystemImg/body10.png"
                  alt=""
                  onClick={e => getBody(e)}
                />
              </li>
            </ul>
          </div>
          <div
            type="button"
            className="M-dollconfrimBtn"
            onClick={() => {
              getCanvas()
            }}
          >
            確認修改
          </div>
        </div>
      </div>
    </>
  )
}

export default MindexChangeavatar
