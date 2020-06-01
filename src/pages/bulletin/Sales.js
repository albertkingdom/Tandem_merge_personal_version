import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { NavLink } from 'react-router-dom'

import '../../css/news.scss'
import {
  AiOutlineClockCircle,
  AiOutlineFolderOpen,
  AiOutlineGift,
} from 'react-icons/ai'
const MySwal = withReactContent(Swal)

function Sales(props) {
  const [salesDetailData, setSalesDetailData] = useState([])
  const [hiddenCoupon, setHiddenCoupon] = useState(false)

  useEffect(() => {
    //fetch
    async function getSalesData() {
      let userData
      try {
        userData = JSON.parse(localStorage.getItem('LoginUserData'))
      } catch (err) {
        console.error(err)
      }
      const req = new Request(
        `http://localhost:6001/bulletin${window.location.pathname}`,
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      const res = await fetch(req)
      const data = await res.json()
      console.dir(data)
      let getIdList = data[0].getId.split(',')
      console.dir(getIdList)
      for (let id of getIdList) {
        if (userData && id === userData.mbId.toString()) {
          setHiddenCoupon(true)
          break
        }
      }

      setSalesDetailData(data)
    }

    getSalesData()
  }, [])

  function getCoupon() {
    try {
      const userData = JSON.parse(localStorage.getItem('LoginUserData'))
      console.log(userData.mbId)
      const req = new Request(
        `http://localhost:6001/bulletin${window.location.pathname}/get?mbId=${userData.mbId}`,
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      fetch(req).then(res => {
        if (res.status === 200) {
          setHiddenCoupon(true)

          MySwal.fire({
            icon: 'success',
            title: '領取成功！',
            showConfirmButton: false,
            timer: 1550,
          })
        } else {
          setHiddenCoupon(false)
          //
        }
      })
    } catch (err) {
      console.error(err)
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '麻煩請先登入會員!',
        footer: '<a href="/">回到登入頁面</a>',
      })
    }
  }

  let sales = salesDetailData[0] ? salesDetailData[0] : ''
  return (
    <>
      {/* <Banner pagename="首頁" /> */}
      <div className="wrapper">
        <div className="banner mb-4">
          <img
            className="object-fit"
            src={`data:image/png;base64,${
              sales == '' ? '' : salesDetailData[0].bImg
            }`}
            alt=""
          />
        </div>

        <div className="container pagination_news">
          <div className="pagination_news_content position-relative">
            <h1 className=" py-3 pagination_news bh1">
              {sales == '' ? '' : salesDetailData[0].bTitle}
            </h1>
            <div className="news_index_detail d-flex justify-content-between pt-2">
              <div className="news_index_detail_icon_group d-flex justify-content-between">
                <NavLink to="#" className="vendor_name">
                  {sales == '' ? '' : salesDetailData[0].vName}
                </NavLink>
                <div className="category_group d-flex">
                  <AiOutlineFolderOpen className="icon" />
                  <NavLink to="/bulletin/news">促銷</NavLink>
                </div>
                <div className="time_group d-flex">
                  <AiOutlineClockCircle className="icon" />
                  <p>{sales == '' ? '' : salesDetailData[0].bDate}</p>
                </div>
              </div>
            </div>
            <p className="py-5 sales_p" style={{ whiteSpace: 'pre-wrap' }}>
              {sales == '' ? '' : salesDetailData[0].bContent}
            </p>
            <NavLink
              onClick={() => getCoupon()}
              // onClick={() => test()}
              to="#"
              className="position-absolute btn get_ticket get_notyet"
              activeStyle={{ display: 'none' }}
              isActive={() => {
                return hiddenCoupon
              }}
            >
              <AiOutlineGift
                style={{ fontSize: 25 + 'px', marginRight: 5 + 'px' }}
              />
              領取優惠卷
            </NavLink>
            <NavLink
              to="#"
              className="position-absolute btn get_ticket disabled alredy_get"
              aria-disabled="true"
            >
              <AiOutlineGift
                style={{ fontSize: 25 + 'px', marginRight: 5 + 'px' }}
              />
              已領取
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sales
