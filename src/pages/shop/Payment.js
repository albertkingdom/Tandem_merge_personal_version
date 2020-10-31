import React, { useState, useEffect, useRef } from 'react'
import { withRouter, Link } from 'react-router-dom'
import '../../css/shop.scss'
import Swal from 'sweetalert2' //sweetalert2
import { Form } from 'react-bootstrap'
import PayProgressbar from '../../components/shop/PayProgessbar'
import CreditCardInput from '../../components/shop/CreditCardInput'

function Payment(props) {
  const [agreement, setAgreement] = useState(false) //是否勾同意條款
  const [itemIds, setItemIds] = useState([])
  const [payMethod, setPayMethod] = useState('') //付款方式
  const [cardNumberValidation, setCardNumberValidation] = useState(false)
  //credit card number input ref
  const creditInputRef = useRef(null)
  //safety code ref
  const safetyCodeRef = useRef(null)
  //登入用戶的id
  const mbId = JSON.parse(localStorage.getItem('LoginUserData')).mbId
  const username = JSON.parse(localStorage.getItem('LoginUserData')).mbName
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
    if (!cardNumberValidation) {
      Swal.fire('請檢查信用卡號!')
      return
    }
    //抓localstorage的商品Id
    let productId = []

    JSON.parse(localStorage.getItem('cart')).map((item, index) => {
      //如果id重複就略過
      if (productId.indexOf(item.id.toString()) === -1) {
        productId.push(item.id.toString())
      }
    })
    setItemIds(productId) //設定商品id to state

    const body = {
      username: username,
      itemIds: JSON.stringify(productId),
      totalPrice: localStorage.getItem('total'),
      mbId: mbId,
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
    if (data.result.affectedRows === 1) {
      // alert('訂單成立!')
      Swal.fire('訂單成立!')
      props.history.push('/order')
    }
  }

  useEffect(() => {
    //選擇信用卡付款就出現卡號輸入欄
    function showcardinput() {
      if (payMethod === 'creditcard') {
        creditInputRef.current.style.maxHeight = '150px'
      } else {
        creditInputRef.current.style.maxHeight = '0px'
      }
    }
    showcardinput()
  }, [payMethod])

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
                <option value="other">Line Pay</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="s-creditcard" ref={creditInputRef}>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label text-right">
                信用卡號
              </label>
              <div className="col-sm-9 pl-2">
                <CreditCardInput checkCardNumber={checkCardNumber} />
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
              <div className="col-auto m-1">
                <select
                  className="form-control-sm"
                  md={4}
                  style={{ width: '100px' }}
                >
                  <option>Jan</option>
                  <option>Feb</option>
                  <option>Mar</option>
                  <option>Apr</option>
                  <option>May</option>
                  <option>Jun</option>
                  <option>Jul</option>
                  <option>Aug</option>
                  <option>Sep</option>
                  <option>Oct</option>
                  <option>Nov</option>
                  <option>Dec</option>
                </select>
              </div>
              <span className="my-1">/</span>
              <div className="col-auto m-1">
                <select className="form-control-sm" style={{ width: '100px' }}>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option>2024</option>
                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                  <option>2029</option>
                  <option>2030</option>
                </select>
              </div>
              <label className="col-auto col-form-label p px-0 mr-1">
                卡片後3碼
              </label>

              <input
                type="text"
                className="form-control-sm col-1 s-safetycode mt-1"
                placeholder=""
                pattern="\d{3}"
                onChange={() =>
                  testpattern(document.querySelector('.s-safetycode'))
                }
                required
              />
              <span
                className="s-safetycode-result"
                style={{ fontSize: '12px', color: 'red', margin: '10px' }}
                ref={safetyCodeRef}
              ></span>
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
          to="/cart_new"
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
          ? props.history.push === '/cart_new'
          : display}
      </div>
    </>
  )
}

export default withRouter(Payment)
