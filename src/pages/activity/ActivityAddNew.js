import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import Swal from 'sweetalert2'
import {
  Row,
  Col,
  Button,
  Form,
  Container,
  OverlayTrigger,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { AiOutlinePicture, AiOutlineQuestionCircle } from 'react-icons/ai'

//檔案上傳套件
import { useDropzone } from 'react-dropzone'

// 圖檔上傳設定
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  top: 0,
  left: '40px',
}
const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 600,
  height: 400,
  padding: 4,
  boxSizing: 'border-box',
}
const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}
const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
}

function ActivityAddNew(props) {
  // 基本設定
  const history = useHistory()
  const [aMId, setAMId] = useState('')
  const [loginStatus, setLoginStatus] = useState(false)
  const [aName, setAName] = useState('')
  const [aLimit, setALimit] = useState('')
  const [aBudget, setABudget] = useState('')
  const [aCostTime, setACostTime] = useState('')
  const [aCategoryId, setACategoryId] = useState('')
  const [aDate, setADate] = useState('')
  const [minDate, setMinDate] = useState('')
  const [aStartDate, setAStartDate] = useState('')
  const [aEndDate, setAEndDate] = useState('')
  const [aContent, setAContent] = useState('')
  const [aLocation, setALocation] = useState('')
  const [aKV, setAKV] = useState([])
  const [files, setFiles] = useState([])
  const aNameInput = useRef(null)
  const aLimitInput = useRef(null)
  const aBudgetInput = useRef(null)
  const aCostTimeInput = useRef(null)
  const aCategoryIdInput = useRef(null)
  const aDateInput = useRef(null)
  const aStartDateInput = useRef(null)
  const aEndDateInput = useRef(null)
  const aContentInput = useRef(null)
  const aLocationInput = useRef(null)
  const rightNow = moment(new Date()).format('YYYY-MM-DD')

  // 進入即判斷localStorage裡面的登入Data(沒有表示尚未登入或已經登出)
  // 為避免被使用者以輸入網址的方式跳轉過來
  useEffect(() => {
    if (localStorage.getItem('LoginUserData')) {
      const localUserData = JSON.parse(localStorage.getItem('LoginUserData'))
      setAMId(localUserData.mbId)
      setMinDate(rightNow)
      setLoginStatus(true)
      // console.log('OK')
    } else {
      setLoginStatus(false)
      // console.log('NO')
      Swal.fire({ title: '請先登入喲！', icon: 'warning' }).then(function(r) {
        history.push('/login')
      })
    }
  }, [history])

  //圖檔上傳設定
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="uploadpic" />
      </div>
    </div>
  ))

  //圖檔上傳判斷
  useEffect(() => {
    setAKV(acceptedFiles)
  }, [acceptedFiles])
  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  //驗證表單各欄位資料，整理並觸發POST傳送
  const addNewActivity = () => {
    if (!aName || aName.length < 2) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '請填寫兩個字以上的中文或英文活動名稱！',
      })
      aNameInput.current.focus()
    } else if (!aLimit) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '至少兩人才能舉辦活動喲！',
      })
      aLimitInput.current.focus()
    } else if (!aBudget) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '若無預算請填寫0元',
      })
      aBudgetInput.current.focus()
    } else if (!aCostTime) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '最低時數是半小時喲！',
      })
      aCostTimeInput.current.focus()
    } else if (!aCategoryId) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '請選擇活動類別！',
      })
      aCategoryIdInput.current.focus()
    } else if (!aDate) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '別忘了活動日期！',
      })
      aDateInput.current.focus()
    } else if (!aStartDate || !aEndDate) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '報名時間要設定喲！！',
      })
      aStartDateInput.current.focus()
    } else if (!aContent) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '請描述一下這次要辦的活動是怎樣的活動～',
      })
      aContentInput.current.focus()
    } else if (!aLocation) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '地址記得填喲！',
      })
      aLocationInput.current.focus()
    }
    const aBookingTime = aStartDate + '-' + aEndDate
    const formdata = new FormData()
    formdata.append('aMId', aMId)
    formdata.append('aName', aName)
    formdata.append('aLimit', aLimit)
    formdata.append('aBudget', aBudget)
    formdata.append('aCostTime', aCostTime)
    formdata.append('aCategoryId', aCategoryId)
    formdata.append('aDate', aDate)
    formdata.append('aBookingTime', aBookingTime)
    formdata.append('aContent', aContent)
    formdata.append('aLocation', aLocation)
    formdata.append('aKV', aKV[0])
    sendNewActivityDataToServer(formdata)
  }

  //傳送表單內接收的資料至後端伺服器
  async function sendNewActivityDataToServer(formdata) {
    const request = new Request(`http://localhost:6001/activity/addNewAc`, {
      method: 'POST',
      body: formdata,
      headers: new Headers({
        Accept: 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()

    Swal.fire({ title: '新增成功', icon: 'success' }).then(function(r) {
      history.push('/activity')
    })
  }

  const show = (
    <>
      <Container className="activityWrap aAddInfo p-3">
        <Form className="mt-4">
          <Row className="m-3">
            <Col md={3} className="text-right">
              活動名稱
            </Col>
            <Col md={5} className="text-left">
              <InputGroup>
                <FormControl
                  type="text"
                  name="aName"
                  id="aName"
                  ref={aNameInput}
                  required
                  onChange={e => setAName(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="m-3">
            <Col md={3} className="text-right">
              人數上限
            </Col>
            <Col md={3} className="text-left">
              <InputGroup>
                <FormControl
                  type="number"
                  name="aLimit"
                  id="aLimit"
                  min="2"
                  ref={aLimitInput}
                  required
                  onChange={e => setALimit(e.target.value)}
                />
                <InputGroup.Append>
                  <InputGroup.Text>人</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row className="m-3">
            <Col md={3} className="text-right">
              預算
            </Col>
            <Col md={3} className="text-left">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="number"
                  name="aBudget"
                  id="aBudget"
                  min="0"
                  ref={aBudgetInput}
                  required
                  onChange={e => setABudget(e.target.value)}
                />
                <InputGroup.Append>
                  <InputGroup.Text>元</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row className="m-3">
            <Col md={3} className="text-right">
              活動需時
            </Col>
            <Col md={3} className="text-left">
              <InputGroup>
                <FormControl
                  type="number"
                  name="aCostTime"
                  id="aCostTime"
                  min="0.5"
                  ref={aCostTimeInput}
                  required
                  onChange={e => setACostTime(e.target.value)}
                />
                <InputGroup.Append>
                  <InputGroup.Text>小時</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row className="m-3">
            <Col md={3} className="text-right">
              類別
            </Col>
            <Col md={3} className="text-left">
              <select
                className="form-control"
                name="aCategoryId"
                id="aCategoryId"
                ref={aCategoryIdInput}
                required
                onChange={e => setACategoryId(e.target.value)}
              >
                <option style={{ display: 'none' }}>--請選擇--</option>
                <option value="ACG01">輕鬆聚會</option>
                <option value="ACG02">專題講座</option>
                <option value="ACG03">技能競賽</option>
                <option value="ACG04">運動休閒</option>
              </select>
              {/* <input className="form-control" type="text" /> */}
            </Col>
          </Row>
          <Row className="m-3">
            <Col md={3} className="text-right">
              活動日期
            </Col>
            <Col md={3} className="text-left">
              <InputGroup>
                <FormControl
                  type="date"
                  name="aDate"
                  id="aDate"
                  min={minDate}
                  ref={aDateInput}
                  required
                  onChange={e => setADate(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col>
              <h6>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <div
                      style={{
                        backgroundColor: 'rgba(255, 100, 100, 0.85)',
                        padding: '2px 10px',
                        color: 'white',
                        borderRadius: 3,
                      }}
                    >
                      注意報名起迄時間請勿超過活動舉辦日期
                    </div>
                  }
                >
                  <AiOutlineQuestionCircle />
                </OverlayTrigger>{' '}
              </h6>
            </Col>
          </Row>
          <Row className="m-3">
            <Col md={3} className="text-right">
              報名起迄時間
            </Col>
            <Col md={3} className="text-left aDateInput d-flex">
              <InputGroup>
                <FormControl
                  type="date"
                  name="aStartDate"
                  id="aStartDate"
                  min={minDate}
                  max={aDate}
                  ref={aStartDateInput}
                  required
                  onChange={e => setAStartDate(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={1}>～</Col>
            <Col md={3} className="text-left">
              <InputGroup>
                <FormControl
                  type="date"
                  name="aEndDate"
                  id="aEndDate"
                  min={aStartDate}
                  max={aDate}
                  ref={aEndDateInput}
                  required
                  onChange={e => setAEndDate(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="m-3">
            <Col md={3} className="text-right">
              活動內容
            </Col>
            <Col md={8} className="text-left">
              <InputGroup>
                <FormControl
                  cols="30"
                  rows="5"
                  name="aContent"
                  id="aContent"
                  as="textarea"
                  ref={aContentInput}
                  required
                  onChange={e => setAContent(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="m-3">
            <Col md={3} className="text-right">
              地址
            </Col>
            <Col md={8} className="text-left">
              <InputGroup>
                <FormControl
                  type="text"
                  name="aLocation"
                  id="aLocation"
                  ref={aLocationInput}
                  required
                  onChange={e => setALocation(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="m-3">
            <Col md={3} className="text-right">
              活動文宣
            </Col>
            <Col md={8} className="text-center align-items-center">
              <section className="aUplodePic position-relative" name="aAddKV">
                <div
                  style={{
                    width: '686px',
                    height: '400px',
                  }}
                  {...getRootProps({ className: 'dropzone' })}
                >
                  <input
                    style={{}}
                    {...getInputProps()}
                    placeholder="Username"
                    className="form-control"
                    name="aKV"
                    required
                  />
                  <p className="aFixUpload">
                    <AiOutlinePicture
                      style={{
                        display: 'flex',
                        margin: 'auto',
                        fontSize: '50px',
                      }}
                    />
                    －－新增文宣檔案，點擊或拖曳圖片至此－－
                  </p>
                  <aside className="position-absolute" style={thumbsContainer}>
                    {thumbs}
                  </aside>
                </div>
              </section>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Button
              className="aBtn aCencal mr-5"
              onClick={() => history.push('/activity')}
            >
              取消
            </Button>
            <Button
              className="aBtn aAgree mr-5"
              onClick={() => addNewActivity()}
            >
              新增
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  )

  const plslogin = (
    <article className="content container">
      <Row className="justify-content-center">
        <h1>！！！不要走後門！！！</h1>
      </Row>
    </article>
  )

  return <>{loginStatus ? show : plslogin}</>
}

export default ActivityAddNew
