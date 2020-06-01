import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  ResponsiveEmbed,
  OverlayTrigger,
} from 'react-bootstrap'
import {
  AiOutlineCarryOut,
  AiFillCarryOut,
  // AiOutlineHeart,
  // AiFillHeart,
  AiOutlineLike,
  AiFillLike,
  AiOutlineLink,
} from 'react-icons/ai'
import moment from 'moment'
import $ from 'jquery'
import Swal from 'sweetalert2'
import copy from 'copy-to-clipboard'
import { useDispatch } from 'react-redux'
import { Callcard } from '../../actions/Maction'

function ActivityContentInfo(props) {
  //基本設定
  const dispatch = useDispatch()
  const infoData = props.aData
  const [ready, setReady] = useState(false)
  const [book, setBook] = useState(false)
  // const [follow, setFollow] = useState(false)
  const [like, setLike] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [mbId, setMbId] = useState('')

  // 進入即判斷localStorage裡面的登入Data(沒有表示尚未登入或已經登出)
  // 為判斷能否觸發參加活動或收藏按讚的功能
  useEffect(() => {
    if (localStorage.getItem('LoginUserData')) {
      setLoginStatus(true)
      setMbId(JSON.parse(localStorage.getItem('LoginUserData')).mbId)
    } else {
      setLoginStatus(false)
    }
  }, [])

  useEffect(() => {
    //偵測props提取資料有沒有進來
    if (infoData.length == 0) {
      setReady(false)
    } else {
      //收到資料，做報名時間的判斷
      let bookLife = infoData.aBookingTime.substr(11)
      let rightnow = moment(new Date()).format('YYYY-MM-DD')
      // console.log(
      //   Date.parse(bookLife).valueOf(),
      //   Date.parse(rightnow).valueOf()
      // )
      if (bookLife < rightnow) {
        // 今天日期超過報名時間，隱藏報名選項
        $('.aBook').css('display', 'none')
      }
      // 讓畫面render
      setReady(true)
      //抓取props裡面訂閱、按讚、追蹤的會員編號是否與登入的會員相符
      const aBFL = props.aData
      let bookIndex = -1
      if (aBFL && aBFL.aBook.length > 0) {
        const aBookArr = JSON.parse(aBFL.aBook)
        bookIndex = aBookArr.findIndex((v, i) => v === mbId)
      }
      let likeIndex = -1
      if (aBFL && aBFL.aLike.length > 0) {
        const aLikeArr = JSON.parse(aBFL.aLike)
        likeIndex = aLikeArr.findIndex((v, i) => v === mbId)
      }
      // 如果資料內有該會員編號，初始值應為true
      if (bookIndex !== -1) {
        setBook(true)
      }
      if (likeIndex !== -1) {
        setLike(true)
      }
    }
  }, [infoData])

  const aSetBFL = () => {
    const aId = infoData.aId
    console.log('aId', aId)

    const BFLData = { book, like, mbId, aId }
    sendBFLtoServer(BFLData)
  }

  async function sendBFLtoServer(BFLData) {
    const request = new Request(`http://localhost:6001/activity/setBFL`, {
      method: 'POST',
      body: JSON.stringify(BFLData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()

    console.log(data)
    // 回頭設定取得的狀態(有沒有參加活動跟按讚)

    // Swal.fire({ title: '新增成功', icon: 'success' }).then(function (r) {
    //   history.push('/activity')
    // })
  }

  //點選判斷
  $('.aBook').click(function () {
    if (loginStatus) {
      if (book) {
        setBook(false)
      } else {
        setBook(true)
      }
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
          window.scrollTo(0, 0)
        }
      })
    }
    aSetBFL()
  })
  // $('.aFollow').click(function () {
  //   if (loginStatus) {
  //     if (follow) {
  //       aSetBFL()
  //       setFollow(false)
  //     } else {
  //       aSetBFL()
  //       setFollow(true)
  //     }
  //   } else {
  //     Swal.fire({
  //       title: '請先登入喲！',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#79CEE2',
  //       cancelButtonColor: '#F9A451',
  //       confirmButtonText: '登入',
  //       cancelButtonText: '取消',
  //     }).then(result => {
  //       if (result.value) {
  //         dispatch(Callcard(true))
  //       }
  //     })
  //   }
  // })
  $('.aLike').click(function () {
    if (loginStatus) {
      if (like) {
        aSetBFL()
        setLike(false)
      } else {
        aSetBFL()
        setLike(true)
      }
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
          window.scrollTo(0, 0)
        }
      })
    }
  })

  //切換狀態顯示設定
  const outlineBook = (
    <>
      <OverlayTrigger
        placement="top"
        overlay={
          <div
            style={{
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
            }}
          >
            報名
          </div>
        }
      >
        <AiOutlineCarryOut />
      </OverlayTrigger>{' '}
    </>
  )
  const fillBook = (
    <>
      <OverlayTrigger
        placement="top"
        overlay={
          <div
            style={{
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
            }}
          >
            取消報名
          </div>
        }
      >
        <AiFillCarryOut />
      </OverlayTrigger>{' '}
    </>
  )
  // const outlineFollow = (
  //   <>
  //     <OverlayTrigger
  //       placement="top"
  //       overlay={
  //         <div
  //           style={{
  //             backgroundColor: 'rgba(255, 100, 100, 0.85)',
  //             padding: '2px 10px',
  //             color: 'white',
  //             borderRadius: 3,
  //           }}
  //         >
  //           收藏
  //         </div>
  //       }
  //     >
  //       <AiOutlineHeart />
  //     </OverlayTrigger>{' '}
  //   </>
  // )
  // const fillFollow = (
  //   <>
  //     <OverlayTrigger
  //       placement="top"
  //       overlay={
  //         <div
  //           style={{
  //             backgroundColor: 'rgba(255, 100, 100, 0.85)',
  //             padding: '2px 10px',
  //             color: 'white',
  //             borderRadius: 3,
  //           }}
  //         >
  //           取消收藏
  //         </div>
  //       }
  //     >
  //       <AiFillHeart />
  //     </OverlayTrigger>{' '}
  //   </>
  // )
  const outlineLike = (
    <>
      <OverlayTrigger
        placement="top"
        overlay={
          <div
            style={{
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
            }}
          >
            讚一個
          </div>
        }
      >
        <AiOutlineLike />
      </OverlayTrigger>{' '}
    </>
  )
  const fillLike = (
    <>
      <OverlayTrigger
        placement="top"
        overlay={
          <div
            style={{
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
            }}
          >
            不要取消QQ
          </div>
        }
      >
        <AiFillLike />
      </OverlayTrigger>{' '}
    </>
  )

  //複製當前頁面網址
  const copyURL = () => {
    const url = window.location.href
    copy(url)
    Swal.fire({ title: '複製成功', icon: 'success' })
  }
  const NO = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )
  const OK = (
    <>
      <Container className="text-center aContent">
        <Col>
          <Row className="m-2">
            <Col md={2} className="text-right">
              主辦者
            </Col>
            <Col md={3} className="text-left">
              {infoData.mbName}
            </Col>
            <Col md={2} className="text-right">
              活動日期
            </Col>
            <Col md={4} className="text-left">
              {infoData.aDate}
            </Col>
          </Row>
          <Row className="m-2">
            <Col md={2} className="text-right">
              人數上限
            </Col>
            <Col md={3} className="text-left">
              {infoData.aLimit}
            </Col>
            <Col md={2} className="text-right">
              預算
            </Col>
            <Col md={4} className="text-left">
              {infoData.aBudget}
            </Col>
          </Row>
          <Row className="m-2">
            <Col md={2} className="text-right">
              活動需時
            </Col>
            <Col md={3} className="text-left">
              {infoData.aCostTime}
            </Col>
            <Col md={2} className="text-right">
              報名期間
            </Col>
            <Col md={4} className="text-left">
              {infoData.aBookingTime}
            </Col>
          </Row>
          <Row className="m-2">
            <Col md={2} className="text-right">
              活動內容
            </Col>
            <Col md={9} className="text-left">
              {infoData.aContent}
            </Col>
          </Row>
          <Row className="m-2">
            <Col className="text-right">地址</Col>
            <Col md={10} className="text-left">
              {infoData.aLocation}
            </Col>
          </Row>
          <Row className="m-2">
            <Col md={{ span: 8, offset: 2 }} className="text-left">
              <div style={{ width: '100%', height: '100%' }}>
                <ResponsiveEmbed
                  aspectRatio="16by9"
                  style={{ border: '1px solid #ccc' }}
                >
                  <embed
                    type="image/svg+xml"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.498959269678!2d121.52911851544677!3d25.017135745120324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a98c0a901ffb%3A0x2b4028ff525f1005!2zMTAw5Y-w5YyX5biC5Lit5q2j5Y2A576F5pav56aP6Lev5LiJ5q61MjQ05be3MuiZn0Ix!5e0!3m2!1szh-TW!2stw!4v1585068170184!5m2!1szh-TW!2stw"
                  />
                </ResponsiveEmbed>
              </div>
            </Col>
          </Row>
          <Row className="aCreatTime">
            <Col md={9} className="text-right">
              創建時間
            </Col>
            <Col className="text-left">{infoData.created_at}</Col>
          </Row>
        </Col>
      </Container>
      {/* Icon區，判斷報名結束時間過後自動隱藏報名鈕 */}
      <Container className="">
        <Col md={{ span: 4, offset: 2 }}>
          <Row className="aIcon d-flex justify-content-between">
            <Col className="aBook">{book ? fillBook : outlineBook}</Col>
            {/* <Col className="aFollow">{follow ? fillFollow : outlineFollow}</Col> */}
            <Col className="aLike">{like ? fillLike : outlineLike}</Col>
            <Col className="aLink">
              <OverlayTrigger
                placement="top"
                overlay={
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 100, 100, 0.85)',
                      padding: '2px 10px',
                      color: 'white',
                      borderRadius: 3,
                    }}
                  >
                    複製連結
                  </div>
                }
              >
                <AiOutlineLink onClick={copyURL} />
              </OverlayTrigger>{' '}
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  )
  return <>{ready ? OK : NO}</>
}

export default ActivityContentInfo
