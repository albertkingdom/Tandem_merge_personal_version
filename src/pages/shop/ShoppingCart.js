import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import '../../css/shop.scss'

import Swal from 'sweetalert2' //sweetalert2
import PayProgressbar from '../../components/shop/PayProgessbar'

import CouponDisplayList from './CouponDisplayList'
import HistoryDisplay from './HistoryDisplay'
import ShoppingCartItem from '../../components/shop/ShoppingCartItem'
import useLoginStatus from '../../components/shop/customHook/useLoginStatus'
//action creator
import { getAzenListfromStorage } from '../../actions/SazenActions'

function ShoppingCart(props) {
  const isLogin = useLoginStatus() //custom hook
  const [mycartDisplay, setMycartDisplay] = useState([])

  const [isSelectCoupon, setIsSelectCoupon] = useState(false)
  const [totalMoney, setTotalMoney] = useState(0) //總金額
  const [coupon, setCoupon] = useState([]) //coupon資訊
  const [couponNo, setCouponNo] = useState('')
  const [discount, setDiscount] = useState(0) //折扣多少錢
  const [browsehistory, setBrowseHistory] = useState([]) //瀏覽紀錄相關資訊
  const [couponOrhistory, setCouponOrHistory] = useState(0) //顯示折價券or瀏覽紀錄
  //redux
  const reduxAzenStatus = useSelector(
    state => state.SuserAzen.isGetDataFromStorage
  )
  const dispatch = useDispatch()

  function getCartFromLocalStorage() {
    // setDataLoading(true)
    if (localStorage.getItem('cart') !== null) {
      const newCart = localStorage.getItem('cart') || []

      setMycartDisplay(JSON.parse(newCart))
    }
  }
  //一開始就會載入購物車資料
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

  // 刪除購物車項目
  const delProductFromCart = value => {
    // setDataLoading(true)

    const currentCart = JSON.parse(localStorage.getItem('cart')) || []

    const newCart = [...currentCart]
    const updateCart = newCart.filter(item => item.id !== value.id)

    localStorage.setItem('cart', JSON.stringify(updateCart))
    //設定資料
    // setMycart(updateCart)
    setMycartDisplay(updateCart)
  }
  const handleCouponSelect = (couponNo, discount) => {
    // console.log('element', element)
    setIsSelectCoupon(prev => !prev)

    setDiscount(discount)
    // console.log(element.getAttribute('value'))
    setCouponNo(couponNo)
  }
  //取消使用折價券
  const cancelCouponSelect = () => {
    setIsSelectCoupon(false)
    setDiscount(0)
  }
  const sum = items => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price
    }
    return total
  }

  useEffect(() => {
    //計算價錢

    let money
    if (isSelectCoupon && couponNo === 'S001') {
      money = sum(mycartDisplay) - discount
    } else if (isSelectCoupon && couponNo === 'S002') {
      money = (sum(mycartDisplay) * parseFloat(discount)) / 100
    } else {
      money = sum(mycartDisplay)
    }
    // let money = sum(mycartDisplay)-coupon.sMethod

    setTotalMoney(money)

    //總價set進Localstorage裡，key='total'
    function SaveTotalToLocalStorage(money) {
      localStorage.setItem('total', money)
    }

    SaveTotalToLocalStorage(money)
  }, [mycartDisplay, coupon, isSelectCoupon, couponNo, discount])

  //抓coupon圖片和資訊
  async function getCoupon() {
    const request = new Request('http://localhost:6001/product/findmycup', {
      method: 'POST',
      body: JSON.stringify({
        mbId: JSON.parse(localStorage.getItem('LoginUserData')).mbId,
      }),
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    setCoupon(data)
  }
  useEffect(() => {
    if (isLogin) {
      getCoupon()
    }
  }, [isLogin])

  useEffect(() => {
    //確認redux內有無按讚清單
    if (isLogin) {
      if (!reduxAzenStatus) {
        //if isGetDataFrom.. 是false，沒有從localstorage抓資料到redux
        dispatch(getAzenListfromStorage())
      }
    }
  }, [dispatch, isLogin, reduxAzenStatus])

  useEffect(() => {
    //抓瀏覽紀錄相關資訊
    function gethistoryfromlocalstorage() {
      let history = JSON.parse(localStorage.getItem('browse-history'))

      setBrowseHistory(history)
    }
    gethistoryfromlocalstorage()
  }, [])

  const display = (
    <>
      <PayProgressbar />

      <div className="d-flex">
        <div className="s-shoppingList col col-8">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="s-columnWidth1 h6">
                  商品名稱
                </th>
                <th scope="col" className="h6">
                  單價
                </th>
                <th scope="col" className="s-columnWidth2 h6">
                  操作
                </th>
              </tr>
            </thead>
          </table>
          <table className="table">
            <tbody className="s-cart-table">
              {mycartDisplay.length !== 0 ? (
                mycartDisplay.map((value, index) => (
                  <ShoppingCartItem
                    key={value.id}
                    value={value}
                    delProductFromCart={delProductFromCart}
                  />
                ))
              ) : (
                <tr>
                  <td className="text-center">
                    <span style={{ fontSize: '20px', textAlign: 'center' }}>
                      您還沒有把商品加入購物車
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <table className="s-totalprice" style={{ width: '100%' }}>
            <tbody>
              <tr className="">
                <td
                  className="text-right pr-2"
                  style={{ width: '75%', fontSize: '20px' }}
                >
                  購買總金額(共{mycartDisplay.length}個商品):
                </td>
                <td>
                  <span
                    className=""
                    style={{ color: 'orange', fontSize: '30px' }}
                  >
                    ${sum(mycartDisplay)}
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  className="text-right pr-2"
                  style={{ width: '75%', fontSize: '20px' }}
                >
                  折扣後:
                </td>
                <td>
                  <div className="p">
                    <span
                      className=""
                      style={{ color: 'orange', fontSize: '30px' }}
                    >
                      $
                      {isSelectCoupon
                        ? couponNo === 'S001'
                          ? sum(mycartDisplay) - discount
                          : sum(mycartDisplay) * (parseFloat(discount) / 100)
                        : sum(mycartDisplay)}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className=""
          style={{ margin: '20px 0px 0px', position: 'relative' }}
        >
          <div
            className="col-12 d-flex justify-content-center"
            style={{ width: '300px', height: '40px' }}
          >
            <button
              className="col-5"
              style={{ border: '0px', height: '35px' }}
              onClick={() => {
                setCouponOrHistory(0)
              }}
            >
              折價券
            </button>
            <button
              className="col-5"
              style={{ border: '0px', height: '35px' }}
              onClick={() => {
                setCouponOrHistory(1)
              }}
            >
              瀏覽紀錄
            </button>
          </div>
          {couponOrhistory === 0 ? (
            <CouponDisplayList
              coupon={coupon}
              isSelectCoupon={isSelectCoupon}
              couponNo={couponNo}
              handleCouponSelect={handleCouponSelect}
              cancelCouponSelect={cancelCouponSelect}
            />
          ) : (
            <HistoryDisplay
              browsehistory={browsehistory}
              updateMyCartDisplay={getCartFromLocalStorage}
            />
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center my-3">
        <Link
          type="button"
          className="btn btn-outline-info mx-2 s-btn-common"
          to="/productlist"
          style={{ fontWeight: '400' }}
        >
          繼續購物
        </Link>
        <Link
          type="button"
          className="btn btn-outline-info mx-2 s-btn-common"
          style={{ fontWeight: '400' }}
          to="#"
          onClick={() => {
            !isLogin ? Swal.fire('請先登入') : props.history.push('/payment')
          }}
        >
          下一步，填付款資訊
        </Link>
      </div>
    </>
  )
  return (
    <>
      <div className="container">{display}</div>
    </>
  )
}

export default withRouter(ShoppingCart)
