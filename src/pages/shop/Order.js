import React, { useState, useEffect } from 'react'
import '../../css/shop.scss'
import { withRouter } from 'react-router-dom'
import PayProgressbar from '../../components/shop/PayProgessbar'
function Order(props) {
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [orderInfo, setOrderInfo] = useState([])
  const [productName, setProductName] = useState('')
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
      const data = await response.json()
      setOrderInfo(data)

      // productIds.push([data])
      setProductId(data[0].itemId)
    }
    console.log('beforeGetOrderInfo')
    getOrderInfo()
    console.log('gerOrderInfo')
    console.log('productId', productId.length)
    if (productId) {
      console.log('找名稱')
      getProductNameFromId()
    }
    // getProductNameFromId(.itemId)
  }, [])

  // console.log('orderInfoCopy Outside',orderInfo[0])
  // console.log('orderInfo',data.itemId)
  // console.log(productIds)
  async function getProductNameFromId() {
    // const orderInfoCopy = {...orderInfo}//對orderInfo做拷貝
    // console.log('orderInfoCopy',orderInfo[0])
    // console.log(id)
    const request = new Request('http://localhost:6001/product/multipleId', {
      method: 'POST',
      body: JSON.stringify({ productIds: productId }),
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    setProductName(data)
  }

  // useEffect(()=>{
  //   if(productId.length>0){
  //     console.log('找名稱')
  //   getProductNameFromId()
  //   }
  // },[])

  //抓出localStorage商品名字
  let productnamearr = []
  const localStorageproductname = JSON.parse(localStorage.getItem('cart'))
  localStorageproductname.map((item, index) => {
    if (productnamearr.indexOf(item.name) == -1) {
      productnamearr.push(item.name)
    }
  })

  console.log('商品名稱array', productnamearr)

  //寄訂單成立通知信
  async function sendOrderEmail() {
    const request = new Request(
      'http://localhost:6001/product/confirmOrderEmail',
      {
        method: 'POST',
        body: JSON.stringify({
          productName: productnamearr,
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
  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

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
            <div class="col-sm-7 p mt-2">
              {orderInfo.map((item, index) => {
                return item.orderId
              })}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">總金額</label>
            <div class="col-sm-5 p mt-2">
              {orderInfo.map((item, index) => {
                return 'NT$' + item.checkSubtotal
              })}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">
              訂單日期
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                className="form-control-plaintext"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=""
                value={orderInfo.map((item, index) => {
                  return item.created_at
                })}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">
              訂購人姓名
            </label>
            <div class="col-sm-5">
              <input
                type="text"
                className="form-control-plaintext"
                id="exampleInputPassword1"
                placeholder=""
                value={JSON.parse(localStorage.getItem('LoginUserData')).mbName}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">
              付款方式
            </label>
            <div class="col-sm-5 my-2">信用卡付款</div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label text-right">
              訂購商品
            </label>
            <div class="col-sm-5 my-2">
              {productnamearr.map((item, index) => {
                return (
                  <p>
                    ({index + 1}) {item}
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
            sendOrderEmail()
            props.history.push('/productlist')
            localStorage.removeItem('cart')
          }}
        >
          完成訂單
        </button>
      </div>
    </>
  )
  return (
    <>
      <div className="container">{dataLoading ? loading : display}</div>
    </>
  )
}

export default withRouter(Order)
