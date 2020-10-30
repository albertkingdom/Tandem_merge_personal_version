import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../../css/shop.scss'
import { AiOutlineDelete, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import Swal from 'sweetalert2' //sweetalert2
import PayProgressbar from '../../components/shop/PayProgessbar'
import {
  cancelAzenToDatabase,
  updateAzenToLocalStorage,
  addAzenToDatabase,
} from '../../components/shop/Functions/Function'
import CouponDisplayList from './CouponDisplayList'
import HistoryDisplay from './HistoryDisplay'
import Loading from '../../components/shop/Loading'

function Cart_new(props) {
  const [mycartDisplay, setMycartDisplay] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [isSelectCoupon, setIsSelectCoupon] = useState(false)
  const [totalMoney, setTotalMoney] = useState(0) //總金額
  const [coupon, setCoupon] = useState([]) //coupon資訊
  const [couponNo, setCouponNo] = useState('')
  const [discount, setDiscount] = useState(0) //折扣多少錢
  const [browsehistory, setBrowseHistory] = useState([]) //瀏覽紀錄相關資訊
  const [couponOrhistory, setCouponOrHistory] = useState(0)
  const [mbAzen_arr_state, setMbAzen_arr_state] = useState([])

  function getCartFromLocalStorage() {
    // setDataLoading(true)
    if (localStorage.getItem('cart') !== null) {
      const newCart = localStorage.getItem('cart') || []

      setMycartDisplay(JSON.parse(newCart))
    }
  }
  //一開始就會載入資料
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

  // 刪除購物車項目
  const updateCartToLocalStorage = value => {
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
  const handleCouponSelect2 = () => {
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
    if (JSON.parse(localStorage.getItem('LoginUserData')) !== null) {
      getCoupon()
    }
  }, [])

  //一開始複製一份LoginUserData的Azen，set到Local的Azen值、setMbAzen_arr_state
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('LoginUserData')) !== null) {
      if (localStorage.getItem('Azen') == null) {
        let mbAzen_str = JSON.parse(localStorage.getItem('LoginUserData'))
          .mbAzen
        mbAzen_str = mbAzen_str.replace('[', '').replace(']', '')
        let mbAzen_arr = mbAzen_str.split(',')
        // const currentLocalAzen = JSON.parse(localStorage.getItem('Azen')) || []
        localStorage.setItem('Azen', JSON.stringify(mbAzen_arr))
        setMbAzen_arr_state(mbAzen_arr)
      } else {
        const currentLocalAzen = JSON.parse(localStorage.getItem('Azen'))
        setMbAzen_arr_state(currentLocalAzen)
      }
    } else {
      localStorage.removeItem('Azen') //如果登出就刪掉localstorage Azen
    }
  }, [])

  useEffect(() => {
    //抓瀏覽紀錄相關資訊
    function gethistoryfromlocalstorage() {
      let history = JSON.parse(localStorage.getItem('browse-history'))

      setBrowseHistory(history)
    }
    gethistoryfromlocalstorage()
  }, [])
  //  歷史紀錄商品加入購物車
  function addHistoryItemtToLocalStorage(value) {
    // setDataLoading(true)
    Swal.fire({ html: `成功加入購物車` })
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []
    let arr = []
    currentCart.forEach(element => {
      arr.push(element.id === value.id)
    })
    if (arr.indexOf(true) === -1) {
      const newCart = [...currentCart, value]
      localStorage.setItem('cart', JSON.stringify(newCart))
      // setMycart(newCart)
      setMycartDisplay(newCart)
    }
  }

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
                mycartDisplay.map((value, index) => {
                  return (
                    <>
                      <tr key={value.id}>
                        <td className="s-columnWidth1">
                          <Link to={`/product/${value.id}`}>
                            <img
                              src={`/images/shop/small_img/${value.img}`}
                              className="img-fluid"
                              alt="..."
                            />
                          </Link>
                        </td>
                        <td className="h5">NT${value.price}</td>
                        <td>
                          {JSON.parse(localStorage.getItem('LoginUserData')) !==
                            null &&
                          mbAzen_arr_state.indexOf(`${value.id}`) !== -1 ? (
                            <button
                              type="button"
                              className="btn mx-2 my-2 s-btn-common-cart"
                              onClick={() => {
                                if (
                                  JSON.parse(
                                    localStorage.getItem('LoginUserData')
                                  ) !== null
                                ) {
                                  updateAzenToLocalStorage(value.id)
                                  cancelAzenToDatabase({
                                    userId: JSON.parse(
                                      localStorage.getItem('LoginUserData')
                                    ).mbId,
                                    unlikeproductId: value.id,
                                  })
                                  setMbAzen_arr_state(prevazenlist =>
                                    prevazenlist.filter(
                                      id => id !== `${value.id}`
                                    )
                                  )
                                } else {
                                  Swal.fire('請先登入!')
                                }
                              }}
                            >
                              <AiFillHeart
                                style={{ color: '#F9A451', fontSize: '24px' }}
                              />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn mx-2 my-2 s-btn-common-cart"
                              onClick={() => {
                                if (
                                  JSON.parse(
                                    localStorage.getItem('LoginUserData')
                                  ) !== null
                                ) {
                                  addAzenToDatabase({
                                    userId: JSON.parse(
                                      localStorage.getItem('LoginUserData')
                                    ).mbId,
                                    likeproductId: value.id,
                                  })
                                  updateAzenToLocalStorage(value.id)
                                  setMbAzen_arr_state(prevazenlist => [
                                    ...prevazenlist,
                                    `${value.id}`,
                                  ])
                                } else {
                                  Swal.fire('請先登入!')
                                }
                              }}
                            >
                              <AiOutlineHeart
                                style={{ color: '#F9A451', fontSize: '24px' }}
                              />
                            </button>
                          )}

                          <button
                            type="button"
                            className="btn  mx-2 s-btn-common-cart"
                            onClick={() =>
                              updateCartToLocalStorage({
                                id: value.id,
                              })
                            }
                          >
                            <AiOutlineDelete
                              style={{ color: '#F9A451', fontSize: '24px' }}
                            />
                          </button>
                        </td>
                      </tr>
                    </>
                  )
                })
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
              handleCouponSelect2={handleCouponSelect2}
            />
          ) : (
            <HistoryDisplay
              browsehistory={browsehistory}
              addHistoryItemtToLocalStorage={addHistoryItemtToLocalStorage}
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
            JSON.parse(localStorage.getItem('LoginUserData')) == null
              ? Swal.fire('請先登入')
              : props.history.push('/payment')
          }}
        >
          下一步，填付款資訊
        </Link>
      </div>
    </>
  )
  return (
    <>
      <div className="container">{dataLoading ? <Loading /> : display}</div>
    </>
  )
}

export default withRouter(Cart_new)
