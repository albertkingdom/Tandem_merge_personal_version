import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { displayChange, myazenproductlist } from '../../actions/Maction'
import {
  AiFillHeart,
  AiOutlineSolution,
  AiOutlineTeam,
  AiOutlineEye,
} from 'react-icons/ai'
import { IoIosMore } from 'react-icons/io'
import { FaGamepad, FaRegEye } from 'react-icons/fa'

//引入icon
import {
  AiFillSetting,
  AiOutlineCloseCircle,
  AiOutlineGift,
  AiOutlineRead,
} from 'react-icons/ai'
import { MdReplay } from 'react-icons/md'

//引入dollsystem
import MindexChangeavatar from '../../components/member/MindexChangeavatar'

//引入折價券側頁
import Mcuponleft from '../../components/member/Mcuponleft'

//送控制dollcall action  寄存使用者資料action
import { dollCall, loaduserdata } from '../../actions/Maction'

function MindexProfile() {
  const localUserData = useSelector(state => state.MbcenterUserDate)
  const dispatch = useDispatch()
  // 關注商品展示
  const [azenpdpos, setAzenpdPos] = useState(0)
  const [recordpos, setRecordpos] = useState(0)
  // 用一個參數紀錄關注商品數量
  const [azenpdlength, setAzenpdLength] = useState(1)
  let startPos = 0
  let walkingDis = 23.2
  // let finalPos = ''
  // let limit = -(azenpdlength * 23.2)

  // TODO 必須利用拿到實體DOM的操作來完成，不然會有一直render的狀況
  useEffect(() => {
    // setInterval(() => {
    //   startPos -= walkingDis
    //   if (startPos < limit) {
    //     startPos = 0
    //   }
    //   finalPos = startPos + 'rem'
    //   // console.log('finalPos:' + finalPos)
    //   setAzenpdPos(finalPos)
    // }, 5000)
    // 發動一個funtion取local值並且設定給state
    // slidermove()
    getUseronlocal()
    findmyazenproduct()
    // getinfoFromLocal()
  }, [])
  // 暫時關閉
  // -----------------------------------
  function useInterval(callback, delay) {
    const savedCallback = useRef()

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

  // // 用在非同步的計算，值需要先寄存在state進行保留
  useInterval(() => {
    startPos = recordpos
    startPos -= walkingDis
    setRecordpos(startPos)
    if (startPos < -((azenpdlength - 2) * 23.2)) setRecordpos(23.2)
    // finalPos = startPos + 'rem'
    // console.log(startPos)
    setAzenpdPos(startPos)
  }, 5000)
  // -----------------------------------

  // 在setInterval裡都是會抓到useeffect
  // console.log('azenpdpos:' + azenpdpos)
  //
  // setTimeout寫法
  // const slidermove = () => {
  //   startPos -= walkingDis
  //   if (startPos < limit) startPos = 0
  //   finalPos = startPos + 'rem'
  //   setAzenpdPos(finalPos)
  //   setTimeout(slidermove, 50000)
  // }
  // 當redux資料發生變動之後，發值給下方edit性別，跟redux資料連動
  useEffect(() => {
    // 當redux會員資料有變動時，傳預設值給編輯專用的state
    setEditNick(localUserData.mbNick)
    setEditCountry(localUserData.mbCountry)
    setEditGender(localUserData.mbGender)
    setEditBrith(localUserData.mbBd)
    setEditph(localUserData.mbPh)
    setEditInvoice(localUserData.mbInv)
    setEditDes(localUserData.mbDes)
  }, [localUserData])

  // 調控生日一次性輸入
  const [editbdbefore, setEditbdbefore] = useState(false)

  const getUseronlocal = () => {
    // 取出localstroage的mbId進行fetch
    const payloadfromLocal = JSON.parse(localStorage.getItem('LoginUserData'))
    // console.log(payloadfromLocal.mbId)
    const Userpak = { mbId: payloadfromLocal.mbId }
    async function getUserfromFetch(usertrace, callback) {
      const request = new Request(
        'http://localhost:6001/tandem/member/getUserfromFetch',
        {
          method: 'POST',
          body: JSON.stringify(usertrace),
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
      // return console.log('我這裡的payload是' + typeof payload[0].mbBd)
      // 從這裡監看是否有輸入過生日, 調控state控制欄位顯示方式
      if (payload[0].mbBd !== '') {
        setEditbdbefore(true)
      }

      // 回收會員資料之後轉往redux state
      dispatch(loaduserdata(payload[0]))
    }
    //呼叫上方fetch送後端
    getUserfromFetch(Userpak)
    // const UserID={}
  }

  // ----------------------------------------------------------------------------------------------------
  // 修改個人資料彈跳
  const [editlistopen, setEditListOpen] = useState(false)
  // dollsystem彈跳
  // const [dollopen, setDollOpen] = useState(false)

  // 優惠券彈跳
  const [cuponopen, setCuponOpen] = useState(false)
  // --------------------------------------------------------------------------------------------------

  // ------------------------取消由local存取所有資料------------------
  // 由於本頁有許多component共用state，由此component取得後送store供component取用
  // const getinfoFromLocal = () => {
  //   const localstorageData = JSON.parse(localStorage.getItem('LoginUserData'))
  //   dispatch(loaduserdata(localstorageData.body))
  // }
  // -------------------------------------修改個人資料--------------------------------------
  // 收集新輸入值，不直接進reduxstate，確認後送fetch，成功後用fetch結果回設reduxstate
  const [editnick, setEditNick] = useState('')
  const [editcountry, setEditCountry] = useState('')
  // 在資料進來之後要預先對性別做設定
  const [editgender, setEditGender] = useState('')
  const [editbrith, setEditBrith] = useState('')
  const [editph, setEditph] = useState('')
  const [editinvoice, setEditInvoice] = useState('')
  const [editdes, setEditDes] = useState('')

  // 將收集的值進行打包送後端
  const postupdatedinfo = () => {
    const editnewinfopack = {
      mbId: localUserData.mbId,
      mbNick: editnick,
      mbCountry: editcountry,
      mbGender: editgender,
      mbBd: editbrith,
      mbPh: editph,
      mbInv: editinvoice,
      mbDes: editdes,
    }
    // 將包裹好的資訊進行fetch
    async function Updateinfo(usereditinput, callback) {
      const request = new Request(
        'http://localhost:6001/tandem/member/Editinfo',
        {
          method: 'POST',
          body: JSON.stringify(usereditinput),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      const response = await fetch(request)
      console.log('RE fetch完成')
      const payload = await response.json()
      console.log(payload)
      //成功後把資料寫入redux state
      if (payload.success) {
        // 取得目前reduxuserdata資料
        const resData = payload.body
        const updateoriData = { ...localUserData }

        updateoriData.mbNick = resData.mbNick
        updateoriData.mbCountry = resData.mbCountry
        updateoriData.mbGender = resData.mbGender
        updateoriData.mbBd = resData.mbBd
        updateoriData.mbPh = resData.mbPh
        updateoriData.mbInv = resData.mbInv
        updateoriData.mbDes = resData.mbDes

        // console.log(JSON.stringify(updateoriData))
        // 同步更新畫面引用reduxstate
        dispatch(loaduserdata(updateoriData))
        // 關閉個人資料表
        setEditListOpen(false)
      }
    }
    //呼叫上方fetch送後端
    Updateinfo(editnewinfopack)
  }
  //取得專注商品資料後，setreduxState[]資料形式讓其他component共用state，進行render
  // myazenproductlist
  // 取得reduxstate
  const myazenlist = useSelector(state => state.Mbazenproduct)
  const findmyazenproduct = () => {
    const getDatafromlocal = JSON.parse(localStorage.getItem('LoginUserData'))
    const input = { mbId: getDatafromlocal.mbId }
    async function Findazenproductinfo(userId, callback) {
      const request = new Request(
        'http://localhost:6001/tandem/member/findAzenproduct',
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
      // console.log('azen fetch完成')
      const payload = await response.json()
      // console.log(payload)
      if (payload.length) {
        // 將payload長度傳給跑馬燈計算
        setAzenpdLength(payload.length)
        // 將結果往redux送
        dispatch(myazenproductlist(payload))
      } else {
        dispatch(myazenproductlist([]))
      }
    }

    //呼叫上方fetch送後端
    Findazenproductinfo(input)
  }
  //處理azen商品render, from reduxstate=>render
  // 控制zaen商品的展開
  const [azenopen, setAzenOpen] = useState(false)

  const zendisplaylist = (
    <>
      {myazenlist.map((val, idx) => {
        return (
          <div className="M-markpdWrapper" key={idx}>
            <div className="M-markpdImg">
              <img
                src={`/images/shop/small_Img/${val.itemImg}`}
                alt=""
                onClick={() => {
                  setAzenOpen(!azenopen)
                }}
              />
            </div>
            <div className={`M-markpdBody ${azenopen ? 'active' : ''}`}>
              <h5>{val.itemName}</h5>
              <span className="M-markpdSub">
                <AiFillHeart />
              </span>
              <span> {val.memberFavoriteId.length}</span> | 售價 :{' '}
              <span>NT {val.itemPrice}</span>
              <div className="M-markpdDes">
                <p>{val.itemIntro}</p>
              </div>
              <a
                href={`http://localhost:3000/product/${val.itemId}`}
                className="M-markpdTrans clearfix"
                style={{ color: 'black' }}
              >
                <IoIosMore />
              </a>
            </div>
            {/* 還要處理遊戲名稱太長問題 */}
            <h5 className={`M-markpdOuttitle ${azenopen ? 'active' : ''}`}>
              {val.itemName}
            </h5>
          </div>
        )
      })}
    </>
  )

  // -----------------生日輸入欄位切換---------------
  const nevereditBd = (
    <>
      <input
        type="text"
        placeholder="只能一次性輸入"
        onChange={e => {
          setEditBrith(e.target.value)
        }}
      />
    </>
  )

  const haveBd = (
    <>
      <h6 className="M-editformh6">{localUserData.mbBd}</h6>
    </>
  )

  return (
    <>
      <div className="M-indexLeft">
        {/* 折價券左按鈕 */}
        <div
          className={`M-mycupontopbtn ${cuponopen ? 'active' : ''}`}
          onClick={() => {
            setCuponOpen(!cuponopen)
          }}
        >
          <AiOutlineGift />
        </div>
        {/* 側邊折價券 */}
        <div className={`M-leftcuponwrapper ${cuponopen ? 'active' : ''}`}>
          <Mcuponleft />
        </div>
        <MindexChangeavatar />
        <div
          className="M-avatarWrapper"
          style={{ height: `${editlistopen ? '52rem' : ''}` }}
        >
          {/* 按鈕提示文字，讓提示同時control紙娃娃選單 */}
          <div
            className="M-avatarmsg1"
            onClick={() => {
              dispatch(dollCall(true))
            }}
          >
            <p>紙娃娃</p>
          </div>
          {/* 個人發文提示文字 */}
          <div
            className="M-postmsg"
            onClick={() => {
              window.location.href = `/Communityprofile/${localUserData.mbId}`
            }}
          >
            <p>發文</p>
          </div>
          {/* 返回會員中心上層提示文字 */}
          <div
            className="M-returnmsg"
            onClick={() => dispatch(displayChange(1))}
          >
            <p>回上層</p>
          </div>
          <div
            className="M-cpmsg"
            onClick={() => {
              setCuponOpen(!cuponopen)
            }}
          >
            <p>優惠券</p>
          </div>
          <section className="M-avatarTop">
            {/* fix */}
            <div className="M-avatartop-up">
              <div className="M-avatarPhoto">
                <img src={localUserData.mbAva} alt="" />
              </div>
              <div className="M-avatarDes">
                <h3 onClick={() => dispatch(displayChange(1))}>
                  {localUserData.mbNick}
                </h3>
                <h6>{localUserData.mbDes}</h6>
              </div>
            </div>
            <div className="M-avatartop-dwn"></div>
          </section>
          {/* 修改個人資料btn */}
          <button
            className="M-mbDeschagebtn"
            onClick={() => {
              setEditListOpen(true)
            }}
          >
            <AiOutlineSolution className="M-Deschagebtnicon" />
            修改個人資料
          </button>
          {/* 外連個人貼文按鈕 */}
          <div className="M-comLink">
            <AiOutlineRead
              onClick={() => {
                window.location.href = `/Communityprofile/${localUserData.mbId}`
              }}
            />
          </div>
          {/* 回主頁層按鈕 */}
          <div
            className="M-MajorLink"
            onClick={() => dispatch(displayChange(1))}
          >
            <MdReplay />
          </div>
          <div className="M-avatarsecondgear">
            <AiFillSetting />
          </div>
          {/* 呼叫紙娃娃btn redux*/}
          <div
            className="M-avatarChange"
            onClick={() => {
              dispatch(dollCall(true))
            }}
          >
            <AiFillSetting />
          </div>

          {/* 修改個人資料主表 */}
          <section className="M-avatardwn">
            <div className="M-mbdesForm">
              {/* 取消修改按鈕 */}
              <div
                className="M-editLeavebtn"
                onClick={() => {
                  setEditListOpen(!editlistopen)
                }}
              >
                <AiOutlineCloseCircle />
              </div>
              <div className="M-mbdesFormtop">
                <div className="M-mbdesformLab">
                  <h6>玩家暱稱</h6>
                  <h6>來自國度</h6>
                  <h6>性別</h6>
                  <h6>生日</h6>
                  <h6>電子郵件</h6>
                  <h6>聯繫手機</h6>
                  <h6>發票載具</h6>
                </div>
                <div className="M-mbdesformIpt">
                  <input
                    type="text"
                    placeholder={localUserData.mbNick}
                    onChange={e => {
                      setEditNick(e.target.value)
                    }}
                  />
                  <input
                    type="text"
                    placeholder={localUserData.mbCountry}
                    onChange={e => {
                      setEditCountry(e.target.value)
                    }}
                  />
                  <select
                    className="M-editformselect"
                    type="select"
                    value={editgender}
                    onChange={e => {
                      setEditGender(e.target.value)
                    }}
                  >
                    <option value="Female">女</option>
                    <option value="Male">男</option>
                  </select>
                  {/* ------------------生日------------------ */}
                  {/* <input
                    type="text"
                    placeholder={localUserData.mbBd}
                    onChange={e => {
                      setEditBrith(e.target.value)
                    }}
                  /> */}
                  {editbdbefore ? haveBd : nevereditBd}
                  {/* ------------------生日------------------ */}
                  <h6 className="M-editformh6">{localUserData.mbE}</h6>
                  <input
                    type="text"
                    placeholder={localUserData.mbPh}
                    onChange={e => {
                      setEditph(e.target.value)
                    }}
                  />
                  <input
                    type="text"
                    placeholder={'/' + localUserData.mbInv}
                    onChange={e => {
                      setEditInvoice(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="M-mbdesFormdwn">
                <h6>個人描述</h6>
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={5}
                  style={{ maxWidth: 230, maxHeight: 130, resize: 'none' }}
                  placeholder={localUserData.mbDes}
                  defaultValue={''}
                  onChange={e => {
                    setEditDes(e.target.value)
                  }}
                />
              </div>
              {/* 之後要再修改樣式---------- */}
              <button
                className="M-mbdesSub"
                defaultValue="確認修改"
                onClick={() => {
                  postupdatedinfo()
                }}
              >
                確認修改
              </button>
            </div>
          </section>
        </div>
        {/* 會員主頁左邊鈕 */}
        <div className="M-subbtnGroup">
          {/* <div className="M-subiconwrapper">
            <div className="M-subicon">
              <AiOutlineRead />
            </div>
            <div className="M-subicon">
              <AiOutlineGift />
            </div>
            <div className="M-subicon">
              <MdReplay />
            </div>
          </div> */}
          <div className="M-subbtnGroupbrick"></div>
          <div className="M-subbtnwrapper">
            <button
              className="M-sublayerbtn"
              onClick={() => {
                dispatch(displayChange(2))
              }}
            >
              <AiOutlineTeam className="M-subicon3" />
              好友管理
            </button>
            <button
              className="M-sublayerbtn"
              onClick={() => {
                dispatch(displayChange(3))
              }}
            >
              <FaGamepad className="M-subicon1" />
              遊戲倉庫
            </button>
            <button
              className="M-sublayerbtn"
              onClick={() => {
                dispatch(displayChange(4))
              }}
            >
              <FaRegEye className="M-subicon2" />
              關注遊戲
            </button>
          </div>
        </div>

        {/* 要從fetch時拿到物品的長度來決定CSS的距離 */}
        {/* 關注商品列表跑馬 */}
        <div className="M-LikeproductWrapper">
          <div className="M-Likeproducthead">
            <h3>關注商品</h3>
          </div>

          {/* 關注商品顯示窗 */}
          <div className="M-azenproductListWindow">
            {/* 關注商品輸送帶 */}
            <div
              className="M-azenproductList"
              style={{ top: `${azenpdpos}rem` }}
            >
              {/* 商品本體 */}
              {zendisplaylist}
              {/* ---------------------------------------------------------------------------------------------------------------------------- */}

              {/* .......................................... */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MindexProfile
