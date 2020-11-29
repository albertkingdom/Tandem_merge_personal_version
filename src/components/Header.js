import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-bootstrap'
import logo from '../logo.svg'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
// Redux登入卡
import { Callcard } from '../actions/Maction'

import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineNotification,
  AiOutlineMenu,
  AiOutlinePoweroff,
  AiOutlineCloseCircle,
} from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import {
  GiPhotoCamera,
  GiSpartanHelmet,
  GiThreeFriends,
  GiTrumpetFlag,
  GiAtom,
} from 'react-icons/gi'

// 登錄卡
import Mlogcard from '../components/member/Mlogcard'
// 好友提示卡
import MdetectaddF from '../components/member/MdetectaddF'
// 行事曆
import ActivityCalendar from './activity/ActivityCalendar'
// 登出相關
import { mlogcontroll } from '../actions/Maction'
//購物車計數
import { getCartCountFromStorage } from '../actions/ScartActions'
function Header() {
  // 判定登入狀態後進行畫面render
  const [loginAut, setLoginAut] = useState(false)
  // ----------------------當local mbId存在時可以進行fetch取資料----------登入後個人頭像-----------------------------
  const [ava, setAva] = useState('')
  useEffect(() => {
    getUserinfofromlocal()
  }, [])
  const getUserinfofromlocal = () => {
    // 確認local有資料後進行fetch
    if (localStorage.getItem('LoginUserData')) {
      const localUserData = JSON.parse(localStorage.getItem('LoginUserData'))
      // ----------------------------登入後利用mbId取得頭像資料後再開啟local state auth-----------
      const mbId = localUserData.mbId
      const input = { mbId }
      async function findmyhomeava(mbIdobj, callback) {
        const request = new Request(
          'http://localhost:6001/tandem/member/findmyhomeava',
          {
            method: 'POST',
            body: JSON.stringify(mbIdobj),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          }
        )
        const response = await fetch(request)
        const payload = await response.json()
        // console.log(payload)

        if (payload.success) {
          setAva(payload.body.mbAva)
          setLoginAut(true)
        }
      }
      //呼叫上方fetch送後端
      findmyhomeava(input)
      // -----------------------------------------------------------
    } else {
      setAva([])
      setLoginAut(false)
    }
  }
  //  render前先檢查localstorage有沒有使用者紀錄轉成state

  // 登入卡彈跳  //修正redux控制logcard
  // const [logcardon, setLogcardOn] = useState(false)
  const dispatch = useDispatch()
  const reduxlogcardon = useSelector(state => state.Mcallogcard)

  //用另外一個callback傳給確認卡控制狀態

  //好友申請卡彈跳
  const [pop, setPop] = useState(false) //彈跳背景

  const [comfirmfcardon, setComfirmfcardon] = useState(false)
  // 好友申請二段驗證彈跳
  const [becomfdbtn, setBecomFdbtn] = useState(false)
  //偵測好友申請狀態
  const addFevent = useSelector(state => state.Mconfirmfriend)
  //展開RWDmenu
  const [rwdmenuopen, setRwdMenuOpen] = useState(false)
  //cart商品數量
  const cartCount = useSelector(state => state.Scart.count)
  //  登出按鈕發出一個function之後，修改上線狀態，清除local記憶，轉頁讓自己消失
  // const UserAuth = useSelector(state => state.MlogAuth)
  const userlogoff = () => {
    if (localStorage.getItem('LoginUserData')) {
      const localUserData = JSON.parse(localStorage.getItem('LoginUserData'))
      const mbId = localUserData.mbId
      const input = { mbId }
      async function logoffmyaccount(mbId, callback) {
        const request = new Request(
          'http://localhost:6001/tandem/member/logout',
          {
            method: 'POST',
            body: JSON.stringify(mbId),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          }
        )
        const response = await fetch(request)
        const payload = await response.json()
        // console.log(payload)
        // return console.log(JSON.stringify(payload))
        if (payload.success) {
          localStorage.removeItem('LoginUserData')
          localStorage.removeItem('LoginAut')
          localStorage.removeItem('cart')
          setLoginAut(false)
          window.location.href = 'http://localhost:3000/'
        } else {
          setLoginAut(true)
        }
      }
      //呼叫上方fetch送後端
      logoffmyaccount(input)
    } else {
      setLoginAut(true)
    }
  }

  //  登入鈕JSX
  const loginbtn = (
    <>
      {/* 登錄卡開啟按鈕 */}
      <NavLink>
        <AiOutlineUser
          onClick={() => {
            //修正redux控制logcard
            dispatch(Callcard(!reduxlogcardon))
            // setLogcardOn(!logcardon)
          }}
        />
      </NavLink>
    </>
  )

  // 登錄卡開啟redux

  const logcardopensignal = useSelector(state => state.Mcallogcard)

  const memberava = (
    <>
      <Link to="/member">
        <div className="T-personavatar">
          <img src={ava} alt="" />
        </div>
      </Link>
    </>
  )

  // activity calender 基本設定
  const [modalShow, setModalShow] = React.useState(false)
  const [loginStatus, setLoginStatus] = useState(false)

  // 進入即判斷localStorage裡面的登入Data(沒有表示尚未登入或已經登出)
  // 因為有可能是其他頁面以登入狀態跳轉過來，所以進入日曆前先作判斷
  useEffect(() => {
    if (localStorage.getItem('LoginUserData')) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])

  //若為登入狀態才能顯示行事曆
  function mayIShow() {
    if (loginStatus) {
      setModalShow(true)
    } else {
      Swal.fire({
        title: '請先登入喲！',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#79CEE2',
        cancelButtonColor: '#F9A451',
        confirmButtonText: '登入',
        cancelButtonText: '取消',
      }).then(result => {
        if (result.value) {
          dispatch(Callcard(true))
          // setLogcardOn(true)
          // history.push('/login')
        }
      })
    }
  }
  //redux cart count 狀態
  const reduxCartCountStatus = useSelector(
    state => state.Scart.isUpdateFromLocal
  )

  //將購物車數量以localstorage的數量更新
  if (reduxCartCountStatus === false) {
    dispatch(getCartCountFromStorage())
  }
  return (
    <>
      <nav className="T-navWrapper container">
        {/* logo部分------------------ */}
        <div className="T-logoWrapper">
          <Link to="/">
            <div className="T-logo">
              <img src={logo} className="" alt="Logo" />
            </div>
          </Link>
        </div>
        {/* -------RWD後切換選單----------------------------------------- */}
        <div className="T-rwdmenuwrapper">
          <div
            className="T-rwdmenubtn"
            onClick={() => {
              setRwdMenuOpen(!rwdmenuopen)
            }}
          >
            <AiOutlineMenu />
            {/* -------------RWDmenu--------------------------------------------*/}
            {/* //背景圓 */}
            <div className={`T-circlebg ${rwdmenuopen ? 'active' : ''}`}></div>
            <div
              className="T-rwdmenucbtn"
              style={{ display: `${rwdmenuopen ? '' : 'none'}` }}
            >
              <AiOutlineCloseCircle />
            </div>
            <div
              style={{ display: `${rwdmenuopen ? '' : 'none'}` }}
              className="T-clickmenuwrapper"
            >
              {/* 連結細節 */}
              <ul className="T-rwdlinklist">
                <Link to="/productlist">
                  <li className="T-rwdlinkpart">
                    <h5 style={{ color: 'white', fontSize: '25px' }}>
                      <GiSpartanHelmet className="T-linkicon" />
                      遊戲庫
                    </h5>
                  </li>
                </Link>
                <Link to="/community">
                  <li className="T-rwdlinkpart">
                    <h5 style={{ color: 'white', fontSize: '25px' }}>
                      <GiPhotoCamera className="T-linkicon" />
                      社群探索
                    </h5>
                  </li>
                </Link>
                <Link to="/activity">
                  <li className="T-rwdlinkpart">
                    <h5 style={{ color: 'white', fontSize: '25px' }}>
                      <GiThreeFriends className="T-linkicon" />
                      活動揪團
                    </h5>
                  </li>
                </Link>
                <Link to="/forum">
                  <li className="T-rwdlinkpart">
                    <h5 style={{ color: 'white', fontSize: '25px' }}>
                      <GiAtom className="T-linkicon" />
                      開發論壇
                    </h5>
                  </li>
                </Link>
                <Link to="/bulletin">
                  <li className="T-rwdlinkpart">
                    <h5 style={{ color: 'white', fontSize: '25px' }}>
                      <GiTrumpetFlag className="T-linkicon" />
                      新聞公告
                    </h5>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        {/* 中央連結最外層----------------- */}
        <div className="T-linkWrapper">
          {/* 中央連結細項----------------- */}
          <ul className="T-linklist">
            <Link to="/productlist">
              <li className="T-linkpart">
                <h5>遊戲庫</h5>
              </li>
            </Link>
            <Link to="/community">
              <li className="T-linkpart">
                <h5>社群探索</h5>
              </li>
            </Link>
            <Link to="/activity">
              <li className="T-linkpart">
                <h5>活動揪團</h5>
              </li>
            </Link>
            <Link to="/forum">
              <li className="T-linkpart">
                <h5>開發論壇</h5>
              </li>
            </Link>
            <Link to="/bulletin">
              <li className="T-linkpart">
                <h5>新聞公告</h5>
              </li>
            </Link>
          </ul>
        </div>
        {/* 右邊個人ICON區 */}
        <div className="T-personicon">
          {/* 購物車數量計量符號 */}
          {localStorage.getItem('cart') !== null ? (
            <div className="T-cartcount">
              {localStorage.getItem('cart') !== null ? cartCount : 0}
            </div>
          ) : (
            ''
          )}
          {/* //登入卡掛入 */}
          <div
            className={`T-Mlogcardwrapper ${
              //修正redux控制logcard
              reduxlogcardon || logcardopensignal ? 'active' : ''
            }`}
          >
            <Mlogcard />
          </div>
          {/* //好友提示卡掛入 */}
          {/* 彈跳視窗背景 */}

          <div
            className={`T-detectgoodfriendwrapper ${
              comfirmfcardon ? 'active' : ''
            }`}
          >
            <div
              className={`M-popUpDivheader ${
                comfirmfcardon && addFevent.addfriendsignal && pop
                  ? 'active'
                  : ''
              }`}
              style={{
                display: `${addFevent.addfriendsignal && pop ? '' : 'none'}`,
              }}
            ></div>

            {/* 加好友提示卡離開按鈕 //外加觸發自己消失*/}
            <div
              className="T-comfirmfdcbtn"
              style={{
                display: `${
                  comfirmfcardon && loginAut && addFevent.addfriendsignal
                    ? ''
                    : 'none'
                }`,
              }}
              onClick={() => {
                setPop(false)
                setComfirmfcardon(false)
              }}
            >
              <AiOutlineCloseCircle />
            </div>
            <MdetectaddF
              confrimtwo={() =>
                // setBecomFdbtn(true)
                Swal.fire({
                  icon: 'success',
                  title: '加好友成功',
                  showConfirmButton: false,
                  timer: 1000,
                }).then(r => {
                  setComfirmfcardon(false)
                  window.location.reload()
                })
              }
            />
          </div>
          <div
            className="T-comfirmtwowrapper"
            style={{ display: `${becomfdbtn ? '' : 'none'}` }}
          >
            <h5>已經成為好友囉!</h5>
            <div
              className="T-comfirmtwobtn"
              onClick={() => {
                setBecomFdbtn(false)
              }}
            ></div>
          </div>
          <ul className="T-personiconlist">
            <li className="T-personiconpart">
              {/* 登入鈕會員頭像切換位置 */}

              {loginAut ? memberava : loginbtn}
            </li>
            <li className="T-personiconpart">
              <NavLink>
                <IoMdNotificationsOutline
                  className={`T-notification ${
                    addFevent.addfriendsignal && loginAut ? 'active' : ''
                  }`}
                  style={{
                    color: `${
                      addFevent.addfriendsignal && loginAut ? '#F9A451' : ''
                    }`,
                  }}
                  onClick={() => {
                    setPop(true)
                    setComfirmfcardon(!comfirmfcardon)
                  }}
                />
              </NavLink>
            </li>
            <li className="T-personiconpart">
              <Link to="/cart" className="nav-link">
                <AiOutlineShoppingCart />
              </Link>
            </li>
            <li className="T-personiconpart">
              <NavLink onClick={mayIShow}>
                <AiOutlineCalendar />
              </NavLink>
              <ActivityCalendar
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </li>

            {/* //-----------登出按鈕------------------ */}

            <li
              className="T-personiconpart"
              style={{ display: `${loginAut ? '' : 'none'}` }}
              onClick={() => {
                userlogoff()
              }}
            >
              <NavLink>
                <AiOutlineLogout />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <NavLink className="" to="/">
            <img src={logo} className="logosize" alt="Logo" />
          </NavLink>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav headerlist ">
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  className="nav-link"
                  href="/cart"
                >
                  遊戲庫
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  className="nav-link"
                  href="/community"
                >
                  社群探索
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  className="nav-link"
                  href="/activity"
                >
                  活動揪團
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  className="nav-link"
                  href="/forum"
                >
                  開發論壇
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  className="nav-linkgit"
                  href="/bulletin"
                >
                  新聞公告
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-end header-icon">
            <NavLink>
              <AiOutlineCalendar />
            </NavLink>
            <NavLink>
              <AiOutlineShoppingCart />
            </NavLink>
            <NavLink
              activeclassname="active"
              className="nav-linkgit"
              href="/member"
            >
              <AiOutlineUser />
            </NavLink>
          </div>
        </div>
      </nav> */}
    </>
  )
}

export default Header
