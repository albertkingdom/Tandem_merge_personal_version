import React, { useState, useEffect } from 'react'
import ActivityCarousel from '../../components/activity/ActivityCarousel'
import ActivityListCard from '../../components/activity/ActivityListCard'
import { Link, useHistory } from 'react-router-dom'
import {
  Container,
  Col,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Button,
} from 'react-bootstrap'
import {
  AiFillPlusCircle,
  AiOutlinePlusCircle,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
  AiOutlineSearch,
} from 'react-icons/ai'
import $ from 'jquery'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { Callcard } from '../../actions/Maction'

function Activity(props) {
  // 基本設定
  const history = useHistory()
  const dispatch = useDispatch()
  const [loginStatus, setLoginStatus] = useState(false)
  const [aData, setAData] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [aCategoryId, setACategoryId] = useState('')
  const [aSearch, setASearch] = useState('')
  const [fill, setFill] = useState(false)

  //連接資料庫
  async function activityData(filter = '') {
    let data = ''
    // 執行fetch的變數，會因if判斷而拿到不同的路徑
    if (filter == '') {
      data = await fetch(
        `http://localhost:6001/activity/${pageNum}/${aCategoryId}`
      )
    } else {
      data = await fetch(`http://localhost:6001/activity/${pageNum}/${filter}`)
    }
    let activityData = await data.json()
    setTotalPages(parseInt(activityData.totalPages))
    setAData(activityData.activity)
  }

  // 進入此頁面的必備動作
  useEffect(() => {
    //連接資料庫以取得列表資料
    activityData()
    //判斷是否為登入狀態，用以確認可否點擊新增活動及
    if (localStorage.getItem('LoginUserData')) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])

  //只要頁數更動或選擇分類就再撈一次資料
  useEffect(() => {
    activityData()
  }, [pageNum, aCategoryId])

  //模糊搜尋
  useEffect(() => {
    activityData(aSearch)
  }, [aSearch])

  // 若是鉤子更動登入狀態則重新判斷一次
  useEffect(() => {
    if (loginStatus) {
      // console.log('登入中')
      // const localUserData = JSON.parse(localStorage.getItem('LoginUserData'))
    } else {
      // console.log('尚未登入或已登出')
    }
  }, [loginStatus])

  //若觸發新增活動Icon，即先判斷登入狀態
  function mayIShow() {
    if (loginStatus) {
      history.push('/activityAddNew')
    } else {
      Swal.fire({
        title: '請先登入喲！',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#79CEE2',
        cancelButtonColor: '#F9A451',
        confirmButtonText: '確認',
        cancelButtonText: '取消',
      }).then(result => {
        if (result.value) {
          dispatch(Callcard(true))
          window.scrollTo(0, 0)
        }
      })
    }
  }

  //儲存頁數的陣列
  const arrPage = []

  //頁數迴圈
  if (aCategoryId) {
    arrPage.length = 0
    for (let i = 1; i <= totalPages; i++) {
      arrPage.push(
        <Link
          onClick={() => setPageNum(i)}
          to={`/activity/${i}/${aCategoryId}`}
        >
          <li>{i}</li>
        </Link>
      )
    }
  } else {
    arrPage.length = 0
    for (let i = 1; i <= totalPages; i++) {
      arrPage.push(
        <Link onClick={() => setPageNum(i)} to={`/activity/${i}/${aSearch}`}>
          <li>{i}</li>
        </Link>
      )
    }
  }

  //偵測捲軸狀態設定新增活動按鈕位置
  $(window).scroll(function () {
    let scrollTop = $(this).scrollTop()
    if (scrollTop >= '100') {
      $('.aAddActivity').addClass('active')
    } else {
      $('.aAddActivity').removeClass('active')
    }
    if (scrollTop >= 2220) {
      $('.aAddActivity').addClass('fix')
    } else {
      $('.aAddActivity').removeClass('fix')
    }
  })

  //hover新增活動按鈕使用特效及設定切換模式
  $('.aAddActivity').hover(
    () => {
      setFill(true)
    },
    () => {
      setFill(false)
    }
  )
  const outlineIcon = (
    <>
      <AiOutlinePlusCircle />
    </>
  )
  const fillIcon = (
    <>
      <OverlayTrigger
        className="animated infinite bounce"
        placement="top"
        overlay={
          <div
            style={{
              backgroundColor: '#F9A451',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
            }}
          >
            創活動
          </div>
        }
      >
        <AiFillPlusCircle />
      </OverlayTrigger>{' '}
    </>
  )

  return (
    <>
      {/* 輪播牆 */}
      <ActivityCarousel />
      {/* 搜尋框 與 分類 */}
      <Col className="justify-content-center align-items-center p-2 m-auto test">
        <Col className="text-center mb-5">
          <Container className="position-relative">
            <InputGroup>
              <FormControl
                className="aSearchbar text-center"
                type="text"
                placeholder="請輸入搜尋內容"
                name="aSearch"
                id="aSearch"
                onChange={e => setASearch(e.target.value)}
              />
            </InputGroup>
            <div className="position-absolute aSearchIcon">
              <AiOutlineSearch />
            </div>
          </Container>
        </Col>
        <Col className="text-center mb-5">
          <Button
            className="aCategory"
            // to="/activity/1/ACG01"
            onClick={() => setACategoryId('ACG01')}
          >
            輕鬆聚會
          </Button>
          <Button
            className="aCategory"
            // to="/activity/1/ACG02"
            onClick={() => setACategoryId('ACG02')}
          >
            專題講座
          </Button>
          <Button
            className="aCategory"
            // to="/activity/1/ACG03"
            onClick={() => setACategoryId('ACG03')}
          >
            技能競賽
          </Button>
          <Button
            className="aCategory"
            // to="/activity/1/ACG04"
            onClick={() => setACategoryId('ACG04')}
          >
            運動休閒
          </Button>
        </Col>
        {/* 新增活動入口 */}
        <div className="aAddActivity" onClick={mayIShow}>
          {fill ? fillIcon : outlineIcon}
        </div>
      </Col>
      {/* 列表 */}
      <Container className="d-flex flex-wrap justify-content-between mt-2">
        {aData.map((value, index) => {
          return <ActivityListCard activity={value} key={index} />
        })}
      </Container>
      {/* 頁數 */}
      <Container>
        <div className="pagination">
          <ul className="d-flex">
            <li>
              <AiOutlineCaretLeft />
            </li>
            {arrPage}
            <li>
              <AiOutlineCaretRight />
            </li>
          </ul>
        </div>
      </Container>
    </>
  )
}

export default Activity
