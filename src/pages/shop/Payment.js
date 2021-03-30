import React, { useState, useEffect, useRef } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../../css/shop.scss'
import Swal from 'sweetalert2' //sweetalert2
import { Form } from 'react-bootstrap'
import PayProgressbar from '../../components/shop/PayProgessbar'
// import CreditCardInput from '../../components/shop/CreditCardInput'
//action creator
import { zeroCartCount } from '../../actions/ScartActions'

function Payment(props) {
  const [agreement, setAgreement] = useState(false) //是否勾同意條款
  // const [itemIds, setItemIds] = useState([])
  const [payMethod, setPayMethod] = useState('') //付款方式
  const [cardNumberValidation, setCardNumberValidation] = useState(false)
  const [prime, setPrime] = useState() //prime by tappay
  //credit card number input ref
  const creditInputRef = useRef(null)
  //safety code ref
  const safetyCodeRef = useRef(null)
  //登入用戶的id
  const mbId = JSON.parse(localStorage.getItem('LoginUserData')).mbId
  const username = JSON.parse(localStorage.getItem('LoginUserData')).mbName
  const dispatch = useDispatch()
  const couponStatus = useSelector(state => state.Scart.discount)

  const checkCardNumber = () => {
    setCardNumberValidation(true)
  }
  //付款資訊傳到server
  async function submitPayment() {
    if (agreement === false) {
      //沒有勾同意就中斷
      Swal.fire('請勾選同意服務條款!')
      return
    }
    // if (!cardNumberValidation) {
    //   Swal.fire('請檢查信用卡號!')
    //   return
    // }

    let productId = JSON.parse(localStorage.getItem('cart')).map(
      item => item.id
    )

    //tappay金流
    // 取得 TapPay Fields 的 status
    const tappayStatus = window.TPDirect.card.getTappayFieldsStatus()

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
      alert('can not get prime')
      return
    }

    // Get prime
    window.TPDirect.card.getPrime(async result => {
      if (result.status !== 0) {
        alert('get prime error ' + result.msg)
        return
      }
      // alert('get prime 成功，prime: ' + result.card.prime)
      let prime = result.card.prime
      // return prime
      setPrime(prime)
      // send prime to your server, to pay with Pay by Prime API .
      // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
      const body = {
        username: username,
        itemIds: JSON.stringify(productId),
        // totalPrice: localStorage.getItem('total'),
        discount: couponStatus,
        mbId: mbId,
        prime: prime,
      }
      const request = new Request('http://localhost:6001/product/payment', {
        method: 'POST',
        body: JSON.stringify(body), //
        credentials: 'include',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const response = await fetch(request)
      const data = await response.json()
      //若寫入資料庫成功就alert，跳轉order頁
      if (data.result.affectedRows === 1 && data.tapPay === 'success') {
        localStorage.removeItem('cart')
        dispatch(zeroCartCount())
        Swal.fire('付款成功!')
        props.history.push('/order')
      } else {
        Swal.fire('付款失敗，訂單未成立!')
      }
    })
  }

  useEffect(() => {
    //選擇信用卡付款就出現卡號輸入欄
    function showcardinput() {
      if (payMethod === 'creditcard') {
        creditInputRef.current.style.maxHeight = '200px'
      } else {
        creditInputRef.current.style.maxHeight = '0px'
      }
    }
    showcardinput()
  }, [payMethod])
  useEffect(() => {
    const APP_ID = 18738
    const APP_KEY =
      'app_R9erM8gpBhDjQAPCDEFKJ85hGX7NA662Sryj2DKta2lTQUwKfrPAHf2g68gb'
    window.TPDirect.setupSDK(APP_ID, APP_KEY, 'sandbox')
    // 必填 CCV Example
    var fields = {
      number: {
        // css selector
        element: '#card-number',
        placeholder: '4242 **** **** ****',
      },
      expirationDate: {
        // DOM object
        element: document.getElementById('card-expiration-date'),
        placeholder: 'MM / YY',
      },
      ccv: {
        element: '#card-ccv',
        placeholder: '後三碼',
      },
    }
    //欄位設定
    window.TPDirect.card.setup({
      fields: fields,
      styles: {
        // Style all elements
        input: {
          color: 'gray',
        },
        // Styling ccv field
        'input.ccv': {
          'font-size': '16px',
        },
        // Styling expiration-date field
        'input.expiration-date': {
          'font-size': '16px',
        },
        // Styling card-number field
        'input.card-number': {
          'font-size': '16px',
        },
        // style focus state
        ':focus': {
          // 'color': 'black'
        },
        // style valid state
        '.valid': {
          color: 'green',
        },
        // style invalid state
        '.invalid': {
          color: 'red',
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        '@media screen and (max-width: 400px)': {
          input: {
            color: 'orange',
          },
        },
      },
    })
    //根據目前卡片輸入狀態
    window.TPDirect.card.onUpdate(function(update) {
      // update.canGetPrime === true
      // --> you can call TPDirect.card.getPrime()
      if (update.canGetPrime) {
        // Enable submit Button to get prime.
        // submitBtn.removeAttribute('disabled')
      } else {
        // Disable submit Button to get prime.
        // submitBtn.setAttribute('disabled', true)
      }

      // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
      if (update.cardType === 'visa') {
        // Handle card type visa.
      }

      // number 欄位是錯誤的
      if (update.status.number === 2) {
        // setNumberFormGroupToError()
      } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess()
      } else {
        // setNumberFormGroupToNormal()
      }

      if (update.status.expiry === 2) {
        // setNumberFormGroupToError()
      } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess()
      } else {
        // setNumberFormGroupToNormal()
      }

      if (update.status.cvc === 2) {
        // setNumberFormGroupToError()
      } else if (update.status.cvc === 0) {
        // setNumberFormGroupToSuccess()
      } else {
        // setNumberFormGroupToNormal()
      }
    })
  }, [])
  //驗證安全碼輸入
  function testpattern(input) {
    let re = /^\d{3}$/
    let ok = re.test(input.value)
    // console.log('安全碼驗證',ok)
    //如果小於3位數就顯示錯誤訊息
    if (!ok) {
      safetyCodeRef.current.innerHTML = '安全碼格式錯誤'
    } else {
      safetyCodeRef.current.innerHTML = ''
    }
  }

  const display = (
    <>
      <PayProgressbar />
      <h3 className="text-center h4 mt-2">付款資訊</h3>
      <div className="s-payment p-2 h5">
        <form>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">總金額</label>
            <div className="col-sm-5 mt-2">
              {'NT$' + localStorage.getItem('total')}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">
              訂購人姓名
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control-plaintext"
                placeholder=""
                defaultValue={username}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right mb-0 ">
              付款方式
            </label>

            <Form.Group controlId="exampleForm.SelectCustom" className="pl-2">
              <Form.Control
                as="select"
                className="mx-2 "
                onChange={e => setPayMethod(e.target.value)}
              >
                <option value="">請選擇付款方式</option>
                <option value="creditcard">信用卡</option>
                {/* <option value="other">Line Pay</option> */}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="s-creditcard" ref={creditInputRef}>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label text-right">
                信用卡號
              </label>
              <div className="col-sm-9 pl-2">
                {/* <CreditCardInput checkCardNumber={checkCardNumber} /> */}
                <div
                  className="tpfield form-control mx-2"
                  id="card-number"
                ></div>
                {/* <span
                  id="s-creditcard-alert"
                  style={{ fontSize: '12px', color: 'red' }}
                ></span> */}
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label text-right">
                到期日
              </label>
              <div className="col-auto pl-2">
                <div
                  className="tpfield form-control mx-2"
                  id="card-expiration-date"
                ></div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label text-right">
                安全碼
              </label>
              <div className="col-auto pl-2">
                <div className="tpfield form-control mx-2" id="card-ccv"></div>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">
              電子載具
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control-plaintext"
                placeholder=""
                defaultValue={
                  `/` + JSON.parse(localStorage.getItem('LoginUserData')).mbInv
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <label className="s-form-check col-5">
              <input
                type="checkbox"
                className="s-form-check-input"
                id="agreement"
                onClick={() => setAgreement(prev => !prev)}
              />
              <span className="s-checkbox"></span>
              <label
                className="s-form-check-label p "
                style={{ position: 'relative', left: '70px' }}
              >
                勾選同意服務條款
              </label>
            </label>
          </div>
        </form>
      </div>

      <div className="d-flex justify-content-center my-3">
        <Link
          type="button"
          className="btn btn-outline-info s-btn-common mx-2"
          style={{ fontWeight: '400' }}
          to="/cart"
        >
          上一頁
        </Link>
        <button
          type="submit"
          className="btn btn-outline-info s-btn-common mx-2"
          onClick={() => submitPayment()}
        >
          進行結帳
        </button>
      </div>
    </>
  )

  return (
    <>
      <div className="container">
        {localStorage.getItem('LoginUserData') == null
          ? props.history.push === '/cart'
          : display}
      </div>
    </>
  )
}

export default withRouter(Payment)
