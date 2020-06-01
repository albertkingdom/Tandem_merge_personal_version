import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Calendar from 'react-calendar'
import moment from 'moment'

import 'react-calendar/dist/Calendar.css'

function ActivityCalendar(props) {
  const history = useHistory()
  const [mbCalendarData, setMbCalendarData] = useState([])
  const [loginStatus, setLoginStatus] = useState(false)

  //日曆連接資料庫取資料
  async function mbCalendar(url) {
    let data = await fetch(url)
    let CalendarData = await data.json()
    setMbCalendarData(CalendarData)
  }

  //日曆顏色及選定日期的設定
  const onChange = date => {
    let selectDate = moment(date).format('YYYY-MM-DD')
    const gotopage = '/activitycontentpage/' + selectDate
    history.push(gotopage)
    props.onHide()
  }
  const tileClassName = ({ date, view }) => {
    if (mbCalendarData.length !== 0) {
      let getDate = moment(date).format('YYYY-MM-DD')
      for (let i = 0; i < mbCalendarData.length; i++) {
        if (getDate === mbCalendarData[i]) {
          return 'twoimage'
        }
      }
      return null
    }
  }

  //判斷登入狀況
  useEffect(() => {
    if (localStorage.getItem('LoginUserData')) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])

  useEffect(() => {
    if (loginStatus) {
      const localUserData = JSON.parse(localStorage.getItem('LoginUserData'))
      const mbId = localUserData.mbId
      const mbURL = `http://localhost:6001/activity/mbCalendar/${mbId}`
      mbCalendar(mbURL)
    }
  }, [loginStatus])

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            您近期將要參與的活動
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-auto">
          <Calendar onChange={onChange} tileClassName={tileClassName} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ActivityCalendar
