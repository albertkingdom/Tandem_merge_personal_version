import React, { useState, useEffect } from 'react'
import '../../css/shop.scss'
import { withRouter } from 'react-router-dom'
import PayProgressbar from '../../components/shop/PayProgessbar'

function Order(props) {
  const [dataLoading, setDataLoading] = useState(false)
  const [orderInfo, setOrderInfo] = useState([])
  const [productName, setProductName] = useState([])
  const [productId, setProductId] = useState('')

  useEffect(() => {
    async function getOrderInfo() {
      const request = new Request('http://localhost:6001/product/orderInfo', {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const response = await fetch(request)
      const { result, itemNames } = await response.json()
      // console.log(result, itemNames)
      setOrderInfo(result)
      setProductId(result[0].itemId)
      setProductName(itemNames)
    }
    getOrderInfo()
    //取得訂單內的商品名稱
    // const localStorageProductName = JSON.parse(
    //   localStorage.getItem('cart')
    // ).map(item => item.name)
  }, [])

  //寄訂單成立通知信
  async function sendOrderEmail() {
    const request = new Request(
      'http://localhost:6001/product/confirmOrderEmail',
      {
        method: 'POST',
        body: JSON.stringify({
          productName: productName,
          orderId: orderInfo[0].orderId,
          checktotal: orderInfo[0].checkSubtotal,
        }),
        credentials: 'include',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
  }

  const display = (
    <>
      <PayProgressbar />
      <h3 className="text-center h4">訂單成立</h3>
      <div className="s-payment p-2 h5">
        <form>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">
              訂單編號
            </label>
            <div className="col-sm-7 p mt-2">
              {orderInfo.map(item => {
                return item.orderId
              })}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">總金額</label>
            <div className="col-sm-5 p mt-2">
              {orderInfo.map((item, index) => {
                return 'NT$' + item.checkSubtotal
              })}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">
              訂單日期
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control-plaintext"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=""
                value={orderInfo.map(item => {
                  return item.created_at
                })}
                readOnly
              />
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
                id="exampleInputPassword1"
                placeholder=""
                value={JSON.parse(localStorage.getItem('LoginUserData')).mbName}
                readOnly
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">
              付款方式
            </label>
            <div className="col-sm-5 my-2">信用卡付款</div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">
              訂購商品
            </label>
            <div className="col-sm-5 my-2">
              {productName.map((item, index) => {
                return (
                  <p key={item.itemName}>
                    ({index + 1}) {item.itemName}
                  </p>
                )
              })}
            </div>
          </div>
        </form>
      </div>

      <div className="d-flex justify-content-center my-3">
        <button
          type="button"
          className="btn btn-outline-info s-btn-common mx-2"
          onClick={() => {
            // sendOrderEmail()
            props.history.push('/productlist')
          }}
        >
          完成訂單
        </button>
      </div>
    </>
  )
  return (
    <>
      <div className="container">{display}</div>
    </>
  )
}

export default withRouter(Order)
