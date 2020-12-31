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
import ButtonOrHistory from '../../components/shop/Button/CouponOrHistory'
import styles from './ShoppingCart.module.scss'

function ShoppingCart(props) {
  const { isLogin } = useLoginStatus() //custom hook
  const [mycartDisplay, setMycartDisplay] = useState([])
  const [totalMoney, setTotalMoney] = useState(0) //總金額
  const [coupon, setCoupon] = useState([]) //買家擁有的所有coupon資訊
  const [couponNo, setCouponNo] = useState('') //選擇使用的折價券
  const [discount, setDiscount] = useState('0') //折扣方式
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

    setMycartDisplay(updateCart)
  }
  const handleCouponSelect = (No, method) => {
    if (couponNo === No) {
      setCouponNo('')
      setDiscount('0')
    } else {
      setCouponNo(No)
      setDiscount(method)
    }
  }

  const sum = items => {
    const totalprice = items.map(item => item.price).reduce((a, b) => a + b, 0)
    return totalprice
  }

  const goNextStep = () => {
    if (!isLogin) {
      Swal.fire('請先登入')
      return
    }
    if (mycartDisplay.length === 0) {
      Swal.fire('請加入商品至購物車')
      return
    }

    props.history.push('/payment')
  }
  useEffect(() => {
    //計算價錢

    let money

    if (discount.includes('%')) {
      money = (sum(mycartDisplay) * parseFloat(discount)) / 100
    } else {
      money = sum(mycartDisplay) - discount
    }
    setTotalMoney(money)

    //總價set進Localstorage裡，key='total'
    function SaveTotalToLocalStorage(money) {
      localStorage.setItem('total', money)
    }

    SaveTotalToLocalStorage(money)
  }, [mycartDisplay, coupon, couponNo, discount])

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
      let history = JSON.parse(localStorage.getItem('browse-history')) || []
      //過濾掉重複
      const unique = []
      const uniqueId = [...new Set(history.map(item => item.itemId))] //[1,2,3]
      uniqueId.map(id => unique.push(history.find(item => item.itemId === id)))
      // console.log('unique', unique)
      setBrowseHistory(unique)
    }
    gethistoryfromlocalstorage()
  }, [])

  const display = (
    <>
      <PayProgressbar />

      <div className="">
        <div className={styles['s-shoppingList']}>
          <table className="table">
            <thead>
              <tr>
                <th className="s-columnWidth1 h6">商品名稱</th>
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
        </div>

        <div
          className=""
          style={{ margin: '20px 0px 0px', position: 'relative' }}
        >
          <ButtonOrHistory
            setCouponOrHistory={setCouponOrHistory}
            couponOrhistory={couponOrhistory}
          />
          {couponOrhistory === 0 ? (
            <CouponDisplayList
              coupon={coupon}
              couponNo={couponNo}
              handleCouponSelect={handleCouponSelect}
            />
          ) : (
            <HistoryDisplay
              browsehistory={browsehistory}
              updateMyCartDisplay={getCartFromLocalStorage}
            />
          )}
        </div>
      </div>

      <div className="mt-2">
        <p>
          <span className="d-inline-block col-6 text-right">
            購買總金額(共{mycartDisplay.length}個商品):
          </span>
          <span className={styles.money}>${sum(mycartDisplay)}</span>
        </p>
        <p>
          <span className="d-inline-block col-6 text-right">折扣後:</span>
          <span className={styles.money}>${totalMoney}</span>
        </p>
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
          onClick={goNextStep}
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
