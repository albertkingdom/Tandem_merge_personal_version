import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { mlogcontroll } from '../../actions/Maction'

//引入icon
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { IoIosLock, IoIosUnlock } from 'react-icons/io'

// 引入sweet alert
import Swal from 'sweetalert2'

function Mlogcard() {
  const dispatch = useDispatch()
  // 卡片切換
  const [logswitch, setLogSwitch] = useState(false)
  //忘記密碼小卡彈跳
  const [forgetpwd, setForgetPwd] = useState(false)
  // 密碼查詢email
  const [fgtraceE, setFgtraceE] = useState('')
  //寄送密碼重設信件
  const resetEmail = () => {
    //TODO 輸入驗證---------------------
    //組裝資訊
    const userfgtraceE = { fgtraceE }
    // fetch後端送信
    async function posttraceE(userfgtraceE, callback) {
      const request = new Request('http://localhost:6001/fgpwd', {
        method: 'POST',
        body: JSON.stringify(userfgtraceE),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      const response = await fetch(request)
      console.log('fetch完成')
      const payload = await response.json()
      console.log(payload)
    }
    // fire上方功能
    posttraceE(userfgtraceE)
  }

  // // 迴圈測試
  // useEffect(() => {
  //   testSettime()
  // }, [])

  // const testSettime = () => {
  //   let num = 0
  //   setTimeout(() => {
  //     num += 1
  //     console.log(num)
  //     testSettime()
  //   }, 5000)
  // }

  //TODO
  //登入取值00 //值驗證 //發fetch後端確認搜索狀態 //成功寫入local//轉頁

  const [userlgE, setUserLgE] = useState('')
  const [userlgPwd, setUserlgPwd] = useState('')
  // 輸入格式判定
  const [lgEerror, setlgEError] = useState(false)
  // 登入成功提示
  const [lginok, setLginOK] = useState(false)
  // 登入失敗提示
  const [lginfail, setLginfail] = useState(false)
  // 回收後端失敗提示
  const [lginfailmsg, setLginfailmsg] = useState('')

  // 先擋掉輸入不正確的部分，減少IO
  useEffect(() => {
    let email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    if (userlgE === '' || !email_pattern.test(userlgE)) {
      // 郵件格式不正確

      return setlgEError(true)
    } else {
      // 郵件格式正確

      return setlgEError(false)
    }
  }, [userlgE])
  // 打包所有資訊，套上資料表用的key

  const handleLog = () => {
    // 把最新的輸入狀況抓取
    const userlogData = { mbE: userlgE, mbPwd: userlgPwd }
    // 這裡先對fetch方式做描述
    async function postLoginfo(userlogData, callback) {
      const request = new Request('http://localhost:6001/tandem/member/check', {
        method: 'POST',
        body: JSON.stringify(userlogData),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      const response = await fetch(request)
      const payload = await response.json()
      // console.log(payload.success) //OK可以執行

      //當回傳結果正確，把資料存入 localStorage
      if (payload.success) {
        localStorage.setItem('LoginUserData', JSON.stringify(payload.body))
        // 為了其他頁面可以運行權限判斷，紀錄登錄狀態，會被轉string，必須轉型判斷
        localStorage.setItem('LoginAut', 1)
        // 打開登入成功提示
        setLginOK(true)
        // 開啟redux使用者權限控制畫面表示
        dispatch(mlogcontroll(true))
        // 進行轉頁
        window.location.href = 'http://localhost:3000/'
      } else {
        // 打開登入失敗提示
        setLginfailmsg(payload.msg)
        setLginfail(true)
      }
      // 轉頁處理回首頁
      // setTimeout(() => {
      //   window.location.href = 'https://www.google.com/?hl=zh-tw'
      // }, 3000)
    }
    //呼叫上方fetch送後端
    postLoginfo(userlogData)
  }
  //註冊取值00//二次密碼驗證 //發fetch後端確認註冊重複性 //成功寫入local//轉首頁//首頁要因為認證的state可以轉換樣式
  // --------------------------------------註冊設定----------------------------------
  const [userRE, setUserRE] = useState('')
  const [userRpwd, setUserRpwd] = useState('')
  const [userRpwd2, setUserRpwd2] = useState('')

  // 輸入格式判定
  const [reError, setReError] = useState(false)
  const [repwderror, setRepwdError] = useState(false)
  // 登入成功提示
  const [rgok, setRgok] = useState(false)
  // 登入失敗提示
  const [rgfail, setRgfail] = useState(false)
  // 後端回來的提示
  const [refailmsg, setRefailmsg] = useState('')

  //TODO需要另外的UI機制來提示使用者
  // 檢查註冊email輸入格式
  useEffect(() => {
    let email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    if (userRE === '' || !email_pattern.test(userRE)) {
      // 註冊發生錯誤
      return setReError(true)
    } else {
      // 註冊mail正確
      return setReError(false)
    }
  }, [userRE])
  // 檢查註冊pwd輸入格式
  useEffect(() => {
    if (userRpwd === '' || userRpwd !== userRpwd2) {
      // 密碼重複檢驗發生錯誤
      return setRepwdError(true)
    } else {
      // 密碼重複比對正確
      return setRepwdError(false)
    }
  }, [userRpwd2])

  const handleRE = () => {
    // 把最新的註冊輸入狀況抓取
    const userREData = { mbE: userRE, mbPwd: userRpwd, mbPwd2: userRpwd2 }
    // 這裡先對fetch方式做描述
    async function postREinfo(userREData, callback) {
      const request = new Request('http://localhost:6001/tandem/member/reg', {
        method: 'POST',
        body: JSON.stringify(userREData),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      const response = await fetch(request)
      console.log('RE fetch完成')
      const payload = await response.json()
      console.log(payload)
      //TODO
      if (payload.success) {
        // 將使用者資料寫入local，供fetch追蹤
        localStorage.setItem('LoginUserData', JSON.stringify(payload.body))
        // 為了其他頁面可以運行權限判斷，紀錄登錄狀態
        localStorage.setItem('LoginAut', 1)
        setRgok(true)
        // 開啟redux使用者權限
        dispatch(mlogcontroll(true))
        // 進行轉頁
        window.location.href = 'http://localhost:3000/'
      } else {
        // console.log('註冊回來的是' + payload)
        setRefailmsg(payload.msg)
        setRgfail(true)
      }

      // setTimeout(() => {
      //   window.location.href = 'https://www.google.com/?hl=zh-tw'
      // }, 3000)
    }
    //呼叫上方fetch送後端
    postREinfo(userREData)
  }

  // ---------之後利用local 取值或者是state?-----當作會員頁往後面fetch資料的id

  // 背景底色控制
  const loginWrapperDefault = 'M-loginWrapper'
  const loginWrapperChange = 'M-loginWrapper active'
  // 登入註冊切換
  const loginDefault = 'M-logCard'
  const loginChange = 'M-logCard active'
  // 方塊切換
  const Brick1Default = 'M-moveBrick1 Brick'
  const Brick1Change = 'M-moveBrick1 Brick active'
  const Brick2Default = 'M-moveBrick2 Brick'
  const Brick2Change = 'M-moveBrick2 Brick active'
  const Brick3Default = 'M-moveBrick3 Brick'
  const Brick3Change = 'M-moveBrick3 Brick active'
  const Brick4Default = 'M-moveBrick4 Brick'
  const Brick4Change = 'M-moveBrick4 Brick active'

  return (
    <>
      <div className={!logswitch ? loginWrapperDefault : loginWrapperChange}>
        {/* 移動的方塊 */}
        <div className={!logswitch ? Brick1Default : Brick1Change}></div>
        <div className={!logswitch ? Brick2Default : Brick2Change}></div>
        <div className={!logswitch ? Brick3Default : Brick3Change}></div>
        <div className={!logswitch ? Brick4Default : Brick4Change}></div>
        {/* 忘記密碼小卡 */}
        <div
          className="M-FgpwdCard"
          style={{ display: `${forgetpwd ? '' : 'none'}` }}
        >
          <div
            className="M-FgpwdCardcBtn"
            onClick={() => {
              setForgetPwd(!forgetpwd)
            }}
          >
            <AiOutlineCloseCircle />
          </div>
          <div className="M-FgpwdCardpic">
            <img src="/images/member/fgpwdbg.svg" alt="" />
          </div>
          <h6>請輸入電子信箱</h6>
          <input
            name="M-fgEmail"
            type="text"
            className="M-FgpwdCardinput"
            onChange={e => {
              setFgtraceE(e.target.value)
            }}
            required
          />
          <button
            className="M-sendMail"
            onClick={() => {
              resetEmail()
              Swal.fire({
                icon: 'info',
                title: '請到信箱檢查重設信',
                showConfirmButton: false,
                timer: 1000,
              }).then(r => {
                window.location.href = 'http://localhost:3000/'
              })
            }}
          >
            寄送驗證信
          </button>
        </div>

        {/* 卡片切換按鈕 */}
        <div
          className="M-newlogcardswitchbtn"
          onClick={() => {
            setLogSwitch(!logswitch)
          }}
        >
          <div
            className={`M-newlogcardswitchbtnChild1 ${
              logswitch ? 'active' : ''
            }`}
          ></div>
          <div
            className={`M-newlogcardswitchbtnChild2 ${
              logswitch ? 'active' : ''
            }`}
          ></div>

          <div
            className={`M-jumpshadow ${logswitch ? 'active' : 'active1'}`}
          ></div>

          <div className={`M-jump ${logswitch ? 'active' : 'active1'}`}>
            <img src="/images/member/knight.svg" alt="" />
          </div>
        </div>
        {/* <!-- 登入卡 --> */}

        <div className={!logswitch ? loginDefault : loginChange}>
          <div className="M-fakeLogo">
            <img src="/images/member/logo.svg" alt="" />
          </div>
          <h3 className={`M-majortopic ${lginok ? 'active' : ''}`}>{`${
            lginok ? '登入成功' : '會員登入'
          }`}</h3>
          {/* <div className="M-apiLog">
            <div className="M-icon"></div>
            <div className="M-icon"></div>
          </div>
          <h3>或使用電子郵件</h3> */}
          <div className="M-logForm">
            <div className="M-inputwrapper">
              <p className={`M-lginputalert ${lgEerror ? '' : 'active'}`}>
                {`${lgEerror ? '請輸入正確郵件格式' : '正確郵件格式'}`}
                {lgEerror ? <IoIosLock /> : <IoIosUnlock />}
              </p>
              <input
                type="text"
                className="M-loginInput"
                name="lgE"
                placeholder="Email"
                required
                onChange={e => {
                  setUserLgE(e.target.value)
                }}
              />
              <input
                type="password"
                className="M-loginInput"
                name="lgPwd"
                placeholder="Password"
                required
                onChange={e => {
                  setUserlgPwd(e.target.value)
                }}
              />
            </div>
            <br />
            <button
              className="M-forgetpwd"
              onClick={() => {
                setForgetPwd(!forgetpwd)
              }}
            >
              忘記密碼
            </button>
            <h4 className="M-lgfailmsg">{`${
              lginfail ? '登入失敗 : ' + lginfailmsg : ''
            }`}</h4>
            <button
              className="M-loginBtn"
              style={{ display: 'inline-block' }}
              onClick={() => {
                handleLog()
              }}
            >
              登入
            </button>
            {/* <div
              className="M-loginSwitch"
              onClick={() => {
                setLogSwitch(!logswitch)
              }}
            ></div> */}
          </div>
        </div>
        {/* -----------------註冊卡--------------- */}
        <div className="M-regCard">
          <div className="M-fakeLogo">
            <img src="/images/member/logo.svg" alt="" />
          </div>
          <h3 className={`M-majortopic ${rgok ? 'active' : ''}`}>{`${
            rgok ? '帳號創建成功' : '帳號創建'
          }`}</h3>
          {/* <div className="M-apiLog">
            <div className="M-icon"></div>
            <div className="M-icon"></div>
          </div>
          <h3>或電子郵件註冊</h3> */}
          <div className="M-logForm">
            <div className="M-inputwrapper">
              <p className={`M-rginputalertEmail ${reError ? '' : 'active'}`}>
                {`${reError ? '請輸入正確郵件格式' : '正確郵件格式'}`}
                {reError ? <IoIosLock /> : <IoIosUnlock />}
              </p>
              <input
                type="text"
                className="M-loginInput"
                name="reEmail"
                placeholder="Email"
                required
                onChange={e => {
                  setUserRE(e.target.value)
                }}
              />
              <input
                type="password"
                className="M-loginInput"
                name="rePwd"
                placeholder="Password"
                required
                onChange={e => {
                  setUserRpwd(e.target.value)
                }}
              />

              <p className={`M-rginputalertpwd ${repwderror ? '' : 'active'}`}>
                {`${repwderror ? '輸入重複密碼' : '重複密碼驗證一致'}`}
                {repwderror ? <IoIosLock /> : <IoIosUnlock />}
              </p>
              <input
                type="password"
                className="M-loginInput"
                name="re2Pwd"
                placeholder="Confirm Password"
                required
                onChange={e => {
                  setUserRpwd2(e.target.value)
                }}
              />
            </div>
            <br />
            <h4 className="M-rgfailmsg">{`${
              rgfail ? '註冊失敗 : ' + refailmsg : ''
            }`}</h4>
            <button
              className="M-regBtn"
              style={{ display: 'inline-block' }}
              onClick={() => {
                handleRE()
              }}
            >
              註冊
            </button>
            {/* <div
              className="M-regSwitch"
              onClick={() => {
                setLogSwitch(!logswitch)
              }}
            ></div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Mlogcard
