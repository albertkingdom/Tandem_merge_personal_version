import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { AiFillLike, AiFillMessage } from 'react-icons/ai'
import Swal from 'sweetalert2'

function ActivityComment(props) {
  // 基本設定
  const history = useHistory()
  const aBData = props.aData
  const aId = aBData.aId
  const localUserData = JSON.parse(localStorage.getItem('LoginUserData'))
  const [aComment, setAComment] = useState('')
  const [aCommentInfo, setACommentInfo] = useState([])
  const [RUOK, setRUOK] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)

  // 讀取資料庫留言內容
  async function getACommentInfo() {
    let data = await fetch(`http://localhost:6001/activity/getComment/${aId}`)
    let getCommentInfo = await data.json()
    if (getCommentInfo) {
      setACommentInfo(getCommentInfo)
    }
  }

  //將留言送至後端
  async function sendNewCommentDataToServer(addCommentData, callback) {
    // console.log(addCommentData)
    const request = new Request(
      `http://localhost:6001/activity${props.location.pathname}`,
      {
        method: 'POST',
        body: JSON.stringify(addCommentData),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const success = await response.json()
    // console.log(success)
    callback()
  }

  // 進入即判斷localStorage裡面的登入Data(沒有表示尚未登入或已經登出)
  // 決定是否有留言的權限
  useEffect(() => {
    if (localStorage.getItem('LoginUserData')) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])

  //判斷props的讀取狀況，得到Data才顯示內容
  useEffect(() => {
    if (aId) {
      setRUOK(true)
      getACommentInfo()
    } else {
      setRUOK(false)
    }
  }, [aBData])

  //新增留言的button clickfunc
  const addNewComment = () => {
    // 判斷登入狀態決定能否留言
    if (loginStatus) {
      //判斷留言輸入框有沒有輸入內容
      if (aComment) {
        //收集要送到後端的資料
        const addCommentData = { aComment, aBData, localUserData }
        //觸發將留言送至後端func
        sendNewCommentDataToServer(addCommentData, getACommentInfo)
      } else {
        Swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '你沒有輸入任何字呀！',
        })
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
          history.push('/login')
        }
      })
    }
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
      {/* 新增留言 */}
      <Col md={{ span: 8, offset: 2 }} className="text-center py-3">
        <Row className="aReply">
          <textarea
            className="form-control"
            name="aComment"
            id="aComment"
            placeholder="說點話吧~"
            onChange={e => setAComment(e.target.value)}
          ></textarea>
        </Row>
        <Row className="justify-content-end">
          <button className="aBtn aAgree p-2" onClick={() => addNewComment()}>
            <div className="aCommentbtn">新增留言</div>
          </button>
        </Row>
      </Col>
      <Col md={4} className="text-right"></Col>
      <Col md={{ span: 8, offset: 2 }}>
        {aCommentInfo.map((value, ind) => (
          <Row className="aComment d-flex" key={ind}>
            <div className="aCommentAvatar">
              <img src={value.mbAva} alt="mAvatar" />
            </div>
            <Col className="aCommentMeta p-2">
              <div className="aMemberInfo d-flex justify-content-between">
                <h5 className="aCommentName m-2">{value.mbName}</h5>
                <p className="aCommentDate m-2 text-right">
                  {value.created_at}
                </p>
              </div>
              <div className="m-1">{value.aComment}</div>
              <div className="justify-content-start d-flex">
                <div className="aCommentLike m-2">
                  <AiFillLike />
                </div>
                <div className="aFollowing m-2">
                  <AiFillMessage />
                </div>
              </div>
            </Col>
          </Row>
        ))}
      </Col>
    </>
  )

  return <>{RUOK ? OK : NO}</>
}

export default withRouter(ActivityComment)
